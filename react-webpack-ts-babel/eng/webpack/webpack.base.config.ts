import * as webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';

const definePluginDefinitions = { 'process.env': {} };

for (const configKey of Object.keys(CONFIG)) {
    definePluginDefinitions['process.env'][`APP_${configKey}`] = JSON.stringify(CONFIG[configKey]);
}

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
        plugins: [new TsconfigPathsPlugin({ configFile: PATHS.tsConfigWebpack })],
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
                            name: 'static/assets/img/[name].[contenthash].[ext]',
                            fallback: {
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'static/assets/img/[name].[contenthash].[ext]',
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
                            name: 'static/assets/img/[name].[hash].[ext]',
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
                            name: 'static/assets/fonts/[name].[contenthash].[ext]',
                            fallback: {
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'static/assets/fonts/[name].[contenthash].[ext]',
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },

    plugins: [new webpack.DefinePlugin(definePluginDefinitions)],
};

export default config;
