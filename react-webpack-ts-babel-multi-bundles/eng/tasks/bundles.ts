import debug from 'debug';
import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { addAsset, getManifest } from '@eng/tasks/utils/assets';
import { addModule } from '@eng/tasks/utils/modulepreload';

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

const imageAssetsPublicPath = path.join(CONFIG.PUBLIC_PATH, PATHS.imageAssetsPath);
const fontAssetsPublicPath = path.join(CONFIG.PUBLIC_PATH, PATHS.fontAssetsPath);

const composeWebpackDefinePluginDefinitions = () => {
    const definePluginDefinitions = { 'process.env': {} };

    for (const configKey of Object.keys(CONFIG)) {
        definePluginDefinitions['process.env'][`APP_${configKey}`] = JSON.stringify(CONFIG[configKey]);
    }

    return definePluginDefinitions;
};

const configurePlugins = (nomodule: boolean) => {
    const plugins = [
        // Identify each module by a hash, so caching is more predictable.
        new webpack.HashedModuleIdsPlugin(),

        // Create manifest of the original filenames to their hashed filenames.
        new ManifestPlugin({
            seed: getManifest(),
            fileName: PATHS.manifestFileName,
            generate: (seed, files) => {
                return files.reduce((manifest, opts) => {
                    // logger(opts);
                    // Needed until this issue is resolved:
                    // https://github.com/danethurber/webpack-manifest-plugin/issues/159
                    const name = path.basename(opts.path);

                    if (name.endsWith('.mjs') || name.endsWith('.js')) {
                        const unhashedName = name.replace(/[_.-][0-9a-f]{10}/, '');
                        addAsset(unhashedName, name);

                        // `opts.isInitial === false` means that chunk is dynamically loaded.
                        if (!nomodule && opts.isChunk && opts.isInitial) {
                            addModule(unhashedName, name);
                        }
                    }

                    return getManifest();
                }, seed);
            },
        }),

        new webpack.DefinePlugin(composeWebpackDefinePluginDefinitions()),
        new LodashModuleReplacementPlugin(),
    ];

    if (process.env.NODE_ENV === 'development') {
        plugins.push(new webpack.NoEmitOnErrorsPlugin());
    } else if (process.env.NODE_ENV === 'production') {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
        );
    }

    return plugins;
};

const configureBabelLoader = (nomodule: boolean) => {
    const browsers = nomodule ? browserlistNoModule : browserlistModule;
    const presetEnvOptionsModule = { modules: false, targets: { browsers } };

    const presetEnvOptionsNoModule = {
        loose: true,
        // modules: false,
        // debug: true,
        corejs: 3,
        useBuiltIns: 'usage',
        forceAllTransforms: true,
        targets: { browsers },
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
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                configFile: false,
                exclude: nomodule
                    ? /node_modules(\/|\\)(core-js|regenerator-runtime|react|react-dom)(\/|\\)/
                    : /node_modules/,
                ...(process.env.NODE_ENV === 'development' && { sourceMaps: true, inputSourceMap: true }),
                presets: [
                    [
                        require.resolve('@babel/preset-env'),
                        nomodule ? presetEnvOptionsNoModule : presetEnvOptionsModule,
                    ],
                    require.resolve('@babel/preset-typescript'),
                    [require.resolve('@babel/preset-react'), { development: process.env.NODE_ENV === 'development' }],
                ],
                plugins,
            },
        },
    };
};

const sharedWebpackModuleRules = [
    {
        test: /\.(bmp|png|jpe?g|gif|webp|ico)(\?.*)?$/,
        use: [
            {
                loader: require.resolve('url-loader'),
                options: {
                    limit: 4096,
                    name: '[name].[contenthash].[ext]',
                    outputPath: PATHS.imageAssetsPath,
                    publicPath: imageAssetsPublicPath,
                    fallback: {
                        loader: require.resolve('file-loader'),
                        options: {
                            name: '[name].[contenthash].[ext]',
                            outputPath: PATHS.imageAssetsPath,
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
                    outputPath: PATHS.imageAssetsPath,
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
                    outputPath: PATHS.fontAssetsPath,
                    publicPath: fontAssetsPublicPath,
                    fallback: {
                        loader: require.resolve('file-loader'),
                        options: {
                            name: '[name].[contenthash].[ext]',
                            outputPath: PATHS.fontAssetsPath,
                            publicPath: fontAssetsPublicPath,
                        },
                    },
                },
            },
        ],
    },
];

const configureCssLoader = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            test: /\.css$/,
            use: [
                {
                    loader: require.resolve('style-loader'),
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
            use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
        };
    } else {
        throw new Error(`Unable to configure css-loader under current process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    }
};

const baseConfig = (nomodule: boolean) => ({
    mode: process.env.NODE_ENV || 'development',
    cache: {},
    ...(process.env.NODE_ENV === 'development' && { devtool: '#source-map' }),
    optimization: {
        ...(!nomodule && {
            splitChunks: {
                chunks: 'all',
            },
        }),
        ...(process.env.NODE_ENV === 'production' && {
            minimizer: [
                new TerserPlugin({
                    test: /\.m?js(\?.*)?$/i,
                    sourceMap: true,
                    terserOptions: {
                        safari10: true,
                    },
                }),
            ],
        }),
    },
    resolve: {
        modules: [PATHS.appDirectory, PATHS.appNodeModules, PATHS.appSrc],
        extensions: ['.ts', '.tsx', '.js', '.mjs', '.jsx'],
    },
});

const modernConfig = Object.assign({}, baseConfig(false), {
    entry: {
        main: PATHS.appMainESModule,
    },
    output: {
        path: PATHS.appBuildOutput,
        publicPath: CONFIG.PUBLIC_PATH,
        filename: '[name]-[chunkhash:10].mjs',
    },
    plugins: configurePlugins(false),
    module: {
        rules: [configureBabelLoader(false), configureCssLoader(), ...sharedWebpackModuleRules],
    },
});

const legacyConfig = Object.assign({}, baseConfig(true), {
    entry: {
        nomodule: PATHS.appMainNoESModule,
    },
    output: {
        path: PATHS.appBuildOutput,
        publicPath: CONFIG.PUBLIC_PATH,
        filename: '[name]-[chunkhash:10].js',
    },
    plugins: configurePlugins(true),
    module: {
        rules: [configureBabelLoader(true), configureCssLoader(), ...sharedWebpackModuleRules],
    },
});

const createCompiler = (config: webpack.Configuration) => {
    const compiler = webpack(config);
    return () => {
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
};

const compileModernBundle = createCompiler(modernConfig);
const compileLegacyBundle = createCompiler(legacyConfig);

export default async () => {
    await compileModernBundle();
    await compileLegacyBundle();
};
