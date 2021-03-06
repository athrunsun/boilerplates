import lodash from 'lodash';
import debug from 'debug';
import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import VueLoader from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { PATHS } from '@eng/paths';
import { VUE_APP_CONFIG_KEY_PREFIX, CONFIG } from '@eng/config';
import { addAsset, getManifest } from '@eng/tasks/utils/assets';
import { addModule } from '@eng/tasks/utils/modulepreload';
import { addCssAsset } from '@eng/tasks/utils/css-assets';

const logger = debug('eng:tasks:bundles');

/**
 * The last two versions of each browser, excluding versions that don't support `<script type="module">`.
 */
const browserlistModule = [
    'last 2 Chrome versions',
    'not Chrome < 60',
    'last 2 Safari versions',
    'not Safari < 10.1',
    'last 2 iOS versions',
    'not iOS < 10.3',
    'last 2 Firefox versions',
    'not Firefox < 54',
    'last 2 Edge versions',
    'not Edge < 15',
];

const browserlistNoModule = ['> 1%', 'last 2 versions', 'Firefox ESR'];

const imageAssetsPublicPath = path.join(CONFIG.PUBLIC_PATH, PATHS.IMAGE_ASSETS_PATH);
const fontAssetsPublicPath = path.join(CONFIG.PUBLIC_PATH, PATHS.FONT_ASSETS_PATH);

function composeWebpackDefinePluginDefinitions() {
    const definePluginDefinitions = { 'process.env': {} };

    for (const configKey of Object.keys(CONFIG)) {
        definePluginDefinitions['process.env'][configKey] = JSON.stringify(CONFIG[configKey]);
    }

    for (const envKey of Object.keys(process.env)) {
        // Will NOT override already processed keys
        if (
            envKey.startsWith(VUE_APP_CONFIG_KEY_PREFIX) &&
            lodash.isNil(definePluginDefinitions['process.env'][envKey])
        ) {
            definePluginDefinitions['process.env'][envKey] = JSON.stringify(process.env[envKey]);
        }
    }

    return definePluginDefinitions;
}

function configurePlugins(nomodule: boolean) {
    const plugins = [
        // Identify each module by a hash, so caching is more predictable.
        new webpack.HashedModuleIdsPlugin(),

        // Create manifest of the original filenames to their hashed filenames.
        new ManifestPlugin({
            seed: getManifest(),
            fileName: PATHS.MANIFEST_FILE_NAME,
            generate: (seed, files) => {
                return files.reduce((manifest, opts) => {
                    // Needed until this issue is resolved:
                    // https://github.com/danethurber/webpack-manifest-plugin/issues/159
                    const name = path.basename(opts.path);

                    const unhashedName = name.replace(/[_.-][0-9a-f]{20}/, '');
                    addAsset(unhashedName, name);

                    // `opts.isInitial === false` means that chunk is dynamically loaded.
                    if (!nomodule && name.endsWith('.mjs') && opts.isChunk && opts.isInitial) {
                        addModule(unhashedName, name);
                    }

                    if (!nomodule && name.endsWith('.css')) {
                        addCssAsset(unhashedName, name);
                    }

                    return getManifest();
                }, seed);
            },
        }),

        new webpack.DefinePlugin(composeWebpackDefinePluginDefinitions()),
        new VueLoader.VueLoaderPlugin(),
    ];

    if (process.env.NODE_ENV === 'development') {
        plugins.push(new webpack.NoEmitOnErrorsPlugin());

        if (!CONFIG.MULTI_BUNDLES) {
            plugins.push(
                new HtmlWebpackPlugin({
                    template: PATHS.APP_INDEX_HTML,
                    title: CONFIG.TITLE,
                    favicon: PATHS.APP_FAVICON,
                    inject: true,
                }),
            );
        }
    } else if (process.env.NODE_ENV === 'production') {
        // This plugin will cause a build error in nomodule mode, most likely because splitChunks is not turned on.
        // In multi-bundles mode, this plugin is used by modern bundle to inject css file, while style-loader is used by
        // legacy bundle to inject inline css, thus make it useless.
        if (!nomodule) {
            plugins.push(
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash].css',
                    chunkFilename: '[id].[contenthash].css',
                }),
            );
        }

        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: nomodule ? 'report_legacy.html' : 'report_modern.html',
                openAnalyzer: false,
            }),
        );

        if (!CONFIG.MULTI_BUNDLES) {
            plugins.push(
                new HtmlWebpackPlugin({
                    template: PATHS.APP_INDEX_HTML,
                    favicon: PATHS.APP_FAVICON,
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        // conservativeCollapse: true,
                        removeComments: true,
                        removeTagWhitespace: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                    },
                }),
            );
        }
    }

    return plugins;
}

function configureVueLoader() {
    return {
        test: /\.vue$/,
        use: {
            loader: require.resolve('vue-loader'),
            options: {
                compilerOptions: {
                    preserveWhitespace: false,
                },
            },
        },
    };
}

function configureBabelLoader(nomodule: boolean) {
    const browsers = nomodule ? browserlistNoModule : browserlistModule;
    const presetEnvOptionsModule = { ignoreBrowserslistConfig: true, modules: false, targets: browsers };

    const presetEnvOptionsNoModule = {
        // loose: true,
        // modules: false,
        // debug: true,
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
        require.resolve('babel-plugin-lodash'),
    ];

    if (nomodule) {
        plugins.push(require.resolve('@babel/plugin-syntax-dynamic-import'));
        plugins.push(require.resolve('@babel/plugin-transform-parameters'));
    }

    return {
        test: /\.(tsx?|m?js)$/,
        exclude: (file: string) => {
            if (nomodule) {
                return /node_modules(\/|\\)(core-js|regenerator-runtime)(\/|\\)/.test(file);
                // return false;
            } else {
                return /node_modules/.test(file) && !/\.vue\.js/.test(file);
            }
        },
        use: {
            loader: 'babel-loader',
            options: {
                ...(process.env.NODE_ENV === 'development' && { cacheDirectory: true }),
                babelrc: false,
                configFile: false,
                ...(process.env.NODE_ENV === 'development' && { sourceMaps: true, inputSourceMap: true }),
                presets: [
                    [
                        require.resolve('@babel/preset-env'),
                        nomodule ? presetEnvOptionsNoModule : presetEnvOptionsModule,
                    ],
                    require.resolve('@babel/preset-typescript'),
                ],
                plugins,
            },
        },
    };
}

function sharedWebpackModuleRules() {
    return [
        {
            test: /\.(bmp|png|jpe?g|gif|webp|ico)(\?.*)?$/,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 4096,
                        name: '[name].[contenthash].[ext]',
                        outputPath: PATHS.IMAGE_ASSETS_PATH,
                        publicPath: imageAssetsPublicPath,
                        fallback: {
                            loader: require.resolve('file-loader'),
                            options: {
                                name: '[name].[contenthash].[ext]',
                                outputPath: PATHS.IMAGE_ASSETS_PATH,
                                publicPath: imageAssetsPublicPath,
                            },
                        },
                    },
                },
            ],
        },
        {
            test: /\.(svg)(\?.*)?$/,
            use: [
                {
                    loader: require.resolve('file-loader'),
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: PATHS.IMAGE_ASSETS_PATH,
                        publicPath: imageAssetsPublicPath,
                    },
                },
            ],
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 4096,
                        name: '[name].[contenthash].[ext]',
                        outputPath: PATHS.FONT_ASSETS_PATH,
                        publicPath: fontAssetsPublicPath,
                        fallback: {
                            loader: require.resolve('file-loader'),
                            options: {
                                name: '[name].[contenthash].[ext]',
                                outputPath: PATHS.FONT_ASSETS_PATH,
                                publicPath: fontAssetsPublicPath,
                            },
                        },
                    },
                },
            ],
        },
    ];
}

function configureCssLoader(nomodule: boolean) {
    if (process.env.NODE_ENV === 'development') {
        return {
            test: /\.css$/,
            use: [
                {
                    loader: require.resolve('vue-style-loader'),
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        };
    } else if (process.env.NODE_ENV === 'production') {
        return {
            test: /\.css$/,
            use: [
                nomodule ? require.resolve('vue-style-loader') : MiniCssExtractPlugin.loader,
                require.resolve('css-loader'),
            ],
        };
    } else {
        throw new Error(`Unable to configure css-loader under current process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    }
}

function configureLessLoader(nomodule: boolean) {
    if (process.env.NODE_ENV === 'development') {
        return {
            test: /\.less$/,
            use: [
                {
                    loader: require.resolve('vue-style-loader'),
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        sourceMap: true,
                        // lessOptions: {
                        //     modifyVars: {
                        //         'primary-color': '#9c27b0',
                        //     },
                        //     javascriptEnabled: true,
                        // },
                    },
                },
            ],
        };
    } else if (process.env.NODE_ENV === 'production') {
        return {
            test: /\.less$/,
            use: [
                nomodule ? require.resolve('vue-style-loader') : MiniCssExtractPlugin.loader,
                require.resolve('css-loader'),
                require.resolve('less-loader'),
            ],
        };
    } else {
        throw new Error(`Unable to configure less-loader under current process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    }
}

function baseConfig(nomodule: boolean) {
    return {
        mode: process.env.NODE_ENV || 'development',
        cache: {},
        ...(process.env.NODE_ENV === 'development' && { devtool: '#source-map' }),
        optimization: {
            ...(!nomodule && {
                splitChunks: {
                    chunks: 'all',
                },
            }),
            ...(process.env.NODE_ENV === 'development' && { minimize: false }),
            ...(process.env.NODE_ENV === 'production' && {
                minimizer: [
                    new TerserPlugin({
                        test: /\.m?js(\?.*)?$/i,
                        // sourceMap: true,
                        terserOptions: {
                            safari10: true,
                        },
                    }),
                ],
            }),
        },
        resolve: {
            modules: [PATHS.APP_DIRECTORY, PATHS.APP_NODE_MODULES, PATHS.APP_SRC],
            extensions: ['.ts', '.tsx', '.js', '.mjs', '.jsx', '.css', '.less', '.vue'],
            alias: {
                '@app': PATHS.APP_SRC,
            },
        },
    };
}

function createModernConfig() {
    return Object.assign({}, baseConfig(false), {
        entry: {
            main: PATHS.APP_MAIN_ES_MODULE,
        },
        output: {
            path: PATHS.APP_BUILD_OUTPUT,
            publicPath: CONFIG.PUBLIC_PATH,
            filename: '[name]-[contenthash].mjs',
        },
        plugins: configurePlugins(false),
        module: {
            noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
            rules: [
                configureVueLoader(),
                configureBabelLoader(false),
                configureCssLoader(false),
                configureLessLoader(false),
                ...sharedWebpackModuleRules(),
            ],
        },
    });
}

function createLegacyConfig() {
    return Object.assign({}, baseConfig(true), {
        entry: {
            nomodule: PATHS.APP_MAIN_NO_ES_MODULE,
        },
        output: {
            path: PATHS.APP_BUILD_OUTPUT,
            publicPath: CONFIG.PUBLIC_PATH,
            filename: '[name]-[contenthash].js',
        },
        plugins: configurePlugins(true),
        module: {
            rules: [
                configureVueLoader(),
                configureBabelLoader(true),
                configureCssLoader(true),
                configureLessLoader(true),
                ...sharedWebpackModuleRules(),
            ],
        },
    });
}

function createCompiler(config: webpack.Configuration) {
    const compiler = webpack(config);
    return function () {
        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err) {
                    return reject(err);
                }
                logger(stats.toString({ colors: true }) + '\n');
                resolve();
            });
        });
    };
}

function createModernBundleCompiler() {
    return createCompiler(createModernConfig());
}

function createLegacyBundleCompiler() {
    return createCompiler(createLegacyConfig());
}

async function bundles() {
    const compileModernBundle = createModernBundleCompiler();
    const compileLegacyBundle = createLegacyBundleCompiler();

    try {
        if (CONFIG.MULTI_BUNDLES) {
            logger('Compiling modern bundle...\n');
            await compileModernBundle();
            logger('Compiling legacy bundle...\n');
            await compileLegacyBundle();
        } else {
            if (CONFIG.OUTPUT_LEGACY_BUNDLE) {
                logger('Compiling legacy bundle...\n');
                await compileLegacyBundle();
            } else {
                logger('Compiling modern bundle...\n');
                await compileModernBundle();
            }
        }
    } catch (error) {
        // Log this way so that we can see all fields of `error` object
        logger([error.message, error]);
    }
}

export { bundles };
