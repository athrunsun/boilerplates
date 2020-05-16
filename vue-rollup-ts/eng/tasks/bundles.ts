import lodash from 'lodash';
import debug from 'debug';
import { rollup, InputOptions, OutputOptions, RollupOptions, OutputBundle, Plugin, PluginContext } from 'rollup';
import rollupPluginBabel from '@rollup/plugin-babel';
import rollupPluginCommonjs from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginReplace from '@rollup/plugin-replace';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginUrl from '@rollup/plugin-url';
import rollupPluginJson from '@rollup/plugin-json';
import rollupPluginPostcss from 'rollup-plugin-postcss';
import rollupPluginVue from 'rollup-plugin-vue';

import { PATHS } from '@eng/paths';
import { VUE_APP_CONFIG_KEY_PREFIX, CONFIG } from '@eng/config';

const logger = debug('eng:tasks:bundles');

// NOTE: this value must be defined outside of the plugin because it needs
// to persist from build to build (e.g. the module and nomodule builds).
// If, in the future, the build process were to extends beyond just this rollup
// config, then the manifest would have to be initialized from a file, but
// since everything is currently being built here, it's OK to just initialize
// it as an empty object when the build starts.
const manifest = {};

/**
 * A Rollup plugin to generate a manifest of chunk names to their filenames
 * (including their content hash). This manifest is then used by the template
 * to point to the correct URL.
 * @return {Object}
 */
function manifestPlugin(): Plugin {
    return {
        name: 'manifest',
        generateBundle(this: PluginContext, options: OutputOptions, bundle: OutputBundle) {
            for (const [fileName, chunkInfo] of Object.entries(bundle)) {
                if (chunkInfo.type === 'chunk') {
                    manifest[chunkInfo.name] = fileName;
                }
            }

            this.emitFile({
                type: 'asset',
                fileName: PATHS.MANIFEST_FILE_NAME,
                source: JSON.stringify(manifest, null, 4),
            });
        },
    };
}

/**
 * A Rollup plugin to generate a list of import dependencies for each entry
 * point in the module graph. This is then used by the template to generate
 * the necessary `<link rel="preload">` tags (`<link rel="modulepreload">` is Chrome-only for now).
 * @return {Object}
 */
function modulepreloadPlugin(): Plugin {
    return {
        name: 'modulepreload',
        generateBundle(this: PluginContext, options: OutputOptions, bundle: OutputBundle) {
            // A mapping of entry chunk names to their full dependency list.
            const modulepreloadMap = {};

            // Loop through all the chunks to detect entries.
            for (const [fileName, chunkInfo] of Object.entries(bundle)) {
                if (chunkInfo.type === 'chunk' && (chunkInfo.isEntry || chunkInfo.isDynamicEntry)) {
                    modulepreloadMap[chunkInfo.name] = [fileName, ...chunkInfo.imports];
                }
            }

            this.emitFile({
                type: 'asset',
                fileName: 'modulepreload.json',
                source: JSON.stringify(modulepreloadMap, null, 4),
            });
        },
    };
}

function createBabelPluginOptions(nomodule: boolean) {
    const browsers = nomodule
        ? ['ie 11']
        : [
              // NOTE: not using the `esmodules` target due to this issue:
              // https://github.com/babel/babel/issues/8809
              'last 2 Chrome versions',
              'last 2 Firefox versions',
              'last 2 Safari versions',
              'last 2 iOS versions',
              'last 2 Edge versions',
          ];

    const presetEnvOptionsModule = { ignoreBrowserslistConfig: true, modules: false, targets: browsers };

    const presetEnvOptionsNoModule = {
        ignoreBrowserslistConfig: true,
        corejs: 3,
        useBuiltIns: 'usage',
        forceAllTransforms: true,
        targets: browsers,
    };

    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                cwd: 'packagejson',
                root: ['./'],
                alias: {
                    '@app': './src',
                    '@eng': './eng',
                    '@test': './__tests__',
                },
            },
        ],
        require.resolve('@babel/plugin-proposal-class-properties'),
    ];

    if (nomodule) {
        plugins.push(require.resolve('@babel/plugin-syntax-dynamic-import'));
        plugins.push(require.resolve('@babel/plugin-transform-parameters'));
        // plugins.push(require.resolve('@babel/plugin-transform-arrow-functions'));
    }

    return {
        // Exclude `core-js` under nomodule mode b/c it will cause a lot of circular dependency warnings.
        // We need to transpile code in `node_modules` under nomodule mode b/c IE11 doesn't support a lot of ES6
        // features, which are used in 3rd-party libraries in `node_modules`.
        // A negative look ahead is also used for regex in `module` mode in order to ensure JS transpilation is applied
        // to Vue SFCs in `node_modules`. See https://vue-loader.vuejs.org/guide/pre-processors.html#excluding-node-modules.
        exclude: nomodule
            ? /node_modules(\/|\\)(core-js|regenerator-runtime)(\/|\\)/
            : /node_modules(\/|\\)(?!.+\.vue\.js)/,
        // Need to include `.js` and `.mjs` files when transpiling `node_modules` code under nomodule mode.
        extensions: nomodule ? ['.ts', '.tsx', '.mjs', '.js'] : ['.ts', '.tsx'],
        babelHelpers: 'bundled',
        babelrc: false,
        configFile: false,
        ...(process.env.NODE_ENV === 'development' && { sourceMaps: true, inputSourceMap: true }),
        presets: [
            [require.resolve('@babel/preset-env'), nomodule ? presetEnvOptionsNoModule : presetEnvOptionsModule],
            require.resolve('@babel/preset-typescript'),
        ],
        plugins,
    };
}

function composeReplacePluginDefinitions() {
    const replacePluginDefinitions = { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') };

    for (const configKey of Object.keys(CONFIG)) {
        replacePluginDefinitions[`process.env.${configKey}`] = JSON.stringify(CONFIG[configKey]);
    }

    for (const envKey of Object.keys(process.env)) {
        // Will NOT override already processed keys
        if (
            envKey.startsWith(VUE_APP_CONFIG_KEY_PREFIX) &&
            lodash.isNil(replacePluginDefinitions[`process.env.${envKey}`])
        ) {
            replacePluginDefinitions[`process.env.${envKey}`] = JSON.stringify(process.env[envKey]);
        }
    }

    return replacePluginDefinitions;
}

function basePlugins({ nomodule = false } = {}) {
    const plugins = [
        rollupPluginNodeResolve({
            // THIS IS VERY IMPORTANT!
            // Without it, rollup won't find the correct entry file of libraries.
            browser: true,
            extensions: ['.mjs', '.js', '.ts', '.tsx'],
        }),
        rollupPluginCommonjs({
            // include: 'node_modules/**',
            // https://github.com/rollup/plugins/issues/304#issuecomment-619858916
            exclude: ['node_modules/lodash-es/*.js'],
            // namedExports: {},
        }),
        rollupPluginBabel(createBabelPluginOptions(nomodule)),
        rollupPluginReplace(composeReplacePluginDefinitions()),
        manifestPlugin(),
        rollupPluginPostcss(process.env.NODE_ENV === 'development' ? { sourceMap: 'inline' } : { minimize: true }),
        rollupPluginUrl(),
        rollupPluginJson(),
        // https://github.com/vuejs/rollup-plugin-vue/issues/238#issuecomment-523133535
        // To address `Multiple conflicting contents for sourcemap source` error
        rollupPluginVue({ needMap: false }),
    ];

    // Only add minification in production
    if (process.env.NODE_ENV === 'production') {
        // TODO: enable if actually deploying this to production, but I have
        // minification off for now so it's easier to view the demo source.
        plugins.push(rollupPluginTerser({ module: !nomodule }));
    }

    return plugins;
}

// Module config for <script type="module">
function createModuleConfig(): RollupOptions {
    return {
        input: {
            main: PATHS.APP_MAIN_ES_MODULE,
        },
        output: {
            ...(process.env.NODE_ENV === 'development' && { sourcemap: true }),
            dir: PATHS.APP_BUILD_OUTPUT,
            format: 'esm',
            entryFileNames: '[name]-[hash].mjs',
            chunkFileNames: '[name]-[hash].mjs',
            // Required only when using `dynamic-import-polyfill`.
            // dynamicImportFunction: '__import__',
        },
        plugins: [...basePlugins(), modulepreloadPlugin()],
        manualChunks(id: string) {
            if (!id.includes('node_modules')) {
                return;
            }

            return 'vendor';
        },
        watch: {
            clearScreen: false,
        },
    };
}

// Legacy config for <script nomodule>
function createNoModuleConfig(): RollupOptions {
    return {
        input: {
            nomodule: PATHS.APP_MAIN_NO_ES_MODULE,
        },
        output: {
            ...(process.env.NODE_ENV === 'development' && { sourcemap: true }),
            dir: PATHS.APP_BUILD_OUTPUT,
            format: 'iife',
            entryFileNames: '[name]-[hash].js',
        },
        plugins: basePlugins({ nomodule: true }),
        inlineDynamicImports: true,
        watch: {
            clearScreen: false,
        },
    };
}

function createBundleConfigs() {
    return [createModuleConfig(), createNoModuleConfig()];
}

async function createBundle(inputOptions: InputOptions, outputOptions: OutputOptions) {
    // create a bundle
    const bundle = await rollup(inputOptions);

    // write the bundle to disk
    await bundle.write(outputOptions);
}

async function bundles() {
    const [moduleConfig, nomoduleConfig] = createBundleConfigs();
    const { output: outputOptionsModule, ...otherOptionsModule } = moduleConfig;
    const { output: outputOptionsNoModule, ...otherOptionsNoModule } = nomoduleConfig;

    try {
        if (CONFIG.MULTI_BUNDLES) {
            logger('Creating modern bundle...');
            await createBundle(otherOptionsModule, outputOptionsModule as OutputOptions);
            logger('Creating legacy bundle...');
            await createBundle(otherOptionsNoModule, outputOptionsNoModule as OutputOptions);
        } else {
            if (CONFIG.OUTPUT_LEGACY_BUNDLE) {
                logger('Creating legacy bundle...');
                await createBundle(otherOptionsNoModule, outputOptionsNoModule as OutputOptions);
            } else {
                logger('Creating modern bundle...');
                await createBundle(otherOptionsModule, outputOptionsModule as OutputOptions);
            }
        }
    } catch (error) {
        // Log this way so that we can see all fields of `error` object
        logger([error.message, error]);
    }
}

export { bundles };
