/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const webpack = require('webpack');

const { PATHS } = require('../paths');
const { REACT_PUBLIC_CONFIG_KEY_PREFIX, CONFIG } = require('../config');

function composeWebpackDefinePluginDefinitions() {
    const definePluginDefinitions = { 'process.env': {} };

    for (const configKey of Object.keys(CONFIG)) {
        definePluginDefinitions['process.env'][configKey] = JSON.stringify(CONFIG[configKey]);
    }

    for (const envKey of Object.keys(process.env)) {
        // Will NOT override already processed keys
        if (
            envKey.startsWith(REACT_PUBLIC_CONFIG_KEY_PREFIX) &&
            definePluginDefinitions['process.env'][envKey] == null
        ) {
            definePluginDefinitions['process.env'][envKey] = JSON.stringify(process.env[envKey]);
        }
    }

    return definePluginDefinitions;
}

const imageAssetsPublicPath = path.join(CONFIG.REACT_PUBLIC_PUBLIC_PATH, PATHS.IMAGE_ASSETS_PATH);
const fontAssetsPublicPath = path.join(CONFIG.REACT_PUBLIC_PUBLIC_PATH, PATHS.FONT_ASSETS_PATH);

module.exports = {
    entry: {
        app: [PATHS.APP_INDEX],
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    resolve: {
        alias: {
            '@': PATHS.APP_SRC,
        },
        modules: [PATHS.APP_DIRECTORY, PATHS.APP_NODE_MODULES, PATHS.APP_SRC],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
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
        ],
    },

    plugins: [new webpack.DefinePlugin(composeWebpackDefinePluginDefinitions())],
};
