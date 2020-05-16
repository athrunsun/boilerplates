import { RollupOptions, OutputOptions, OutputBundle, OutputChunk, Plugin, PluginContext } from 'rollup';
import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginCommonjs from 'rollup-plugin-commonjs';
import rollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import rollupPluginReplace from 'rollup-plugin-replace';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginUrl from 'rollup-plugin-url';
import svgrRollup from '@svgr/rollup';
import rollupPluginJson from 'rollup-plugin-json';
import rollupPluginPostcss from 'rollup-plugin-postcss';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';

// NOTE: this value must be defined outside of the plugin because it needs
// to persist from build to build (e.g. the module and nomodule builds).
// If, in the future, the build process were to extends beyond just this rollup
// config, then the manifest would have to be initialized from a file, but
// since everything  is currently being built here, it's OK to just initialize
// it as an empty object when the build starts.
const manifest = {};

/**
 * A Rollup plugin to generate a manifest of chunk names to their filenames
 * (including their content hash). This manifest is then used by the template
 * to point to the currect URL.
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
                fileName: 'manifest.json',
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

    const presetEnvOptionsModule = { modules: false, targets: { browsers } };

    const presetEnvOptionsNoModule = {
        targets: { browsers },
        useBuiltIns: 'usage',
        corejs: 3,
        forceAllTransforms: true,
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
    }

    return {
        // Exclude `core-js` under nomodule mode b/c it will cause a lot of circular dependency warnings.
        // We need to transpile code in `node_modules` under nomodule mode b/c IE11 doesn't support a lot of ES6
        // features, which are used in 3rd-party libraries in `node_modules`.
        exclude: nomodule ? /node_modules(\/|\\)(core-js|react|react-dom)(\/|\\)/ : /node_modules/,
        // Need to include `.js` files when transpiling `node_modules` code under nomodule mode.
        extensions: nomodule ? ['.ts', '.tsx', '.js'] : ['.ts', '.tsx'],
        babelrc: false,
        configFile: false,
        ...(process.env.NODE_ENV === 'development' && { sourceMaps: true, inputSourceMap: true }),
        presets: [
            [require.resolve('@babel/preset-env'), nomodule ? presetEnvOptionsNoModule : presetEnvOptionsModule],
            require.resolve('@babel/preset-typescript'),
            [require.resolve('@babel/preset-react'), { development: process.env.NODE_ENV === 'development' }],
        ],
        plugins,
    };
}

function basePlugins({ nomodule = false } = {}) {
    const replacePluginDefinitions = { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') };

    for (const configKey of Object.keys(CONFIG)) {
        replacePluginDefinitions[`process.env.APP_${configKey}`] = JSON.stringify(CONFIG[configKey]);
    }

    const plugins = [
        rollupPluginNodeResolve({
            // THIS IS VERY IMPORTANT!
            // Without it, rollup won't find the correct entry file of libraries.
            browser: true,
            extensions: ['.mjs', '.js', '.ts', '.tsx'],
        }),
        rollupPluginCommonjs({
            // include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': ['Component', 'PureComponent', 'useState', 'useEffect'],
                'node_modules/react-is/index.js': ['isValidElementType'],
            },
        }),
        rollupPluginBabel(createBabelPluginOptions(nomodule)),
        rollupPluginReplace(replacePluginDefinitions),
        manifestPlugin(),
        rollupPluginPostcss(process.env.NODE_ENV === 'development' ? { sourceMap: 'inline' } : { minimize: true }),
        rollupPluginUrl(),
        svgrRollup(),
        rollupPluginJson(),
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
const moduleConfig: RollupOptions = {
    input: {
        main: PATHS.appMainESModule,
    },
    output: {
        ...(process.env.NODE_ENV === 'development' && { sourcemap: true }),
        dir: PATHS.appBuildOutput,
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

// Legacy config for <script nomodule>
const nomoduleConfig: RollupOptions = {
    input: {
        nomodule: PATHS.appMainNoESModule,
    },
    output: {
        ...(process.env.NODE_ENV === 'development' && { sourcemap: true }),
        dir: PATHS.appBuildOutput,
        format: 'iife',
        entryFileNames: '[name]-[hash].js',
    },
    plugins: basePlugins({ nomodule: true }),
    inlineDynamicImports: true,
    watch: {
        clearScreen: false,
    },
};

const buildConfigs = [moduleConfig, nomoduleConfig];

export { buildConfigs };
