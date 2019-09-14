import path from 'path';
import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';

const definePluginDefinitions = { 'process.env': {} };

for (const configKey of Object.keys(CONFIG)) {
    definePluginDefinitions['process.env'][`APP_${configKey}`] = JSON.stringify(CONFIG[configKey]);
}

const imageAssetsPublicPath = path.join(CONFIG.PUBLIC_PATH, PATHS.imageAssetsPath);
const fontAssetsPublicPath = path.join(CONFIG.PUBLIC_PATH, PATHS.fontAssetsPath);

const config: webpack.Configuration = {
    entry: {
        app: [PATHS.appIndex],
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    resolve: {
        modules: [PATHS.appDirectory, PATHS.appNodeModules, PATHS.appSrc],
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
        ],
    },

    plugins: [new webpack.DefinePlugin(definePluginDefinitions), new LodashModuleReplacementPlugin()],
};

export default config;
