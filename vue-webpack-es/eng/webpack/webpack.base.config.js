import webpack from 'webpack';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';

const definePluginDefinitions = { 'process.env': {} };

for (const configKey of Object.keys(CONFIG)) {
    definePluginDefinitions['process.env'][`APP_${configKey}`] = JSON.stringify(CONFIG[configKey]);
}

const config = {
    entry: {
        app: [PATHS.appIndex],
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    resolve: {
        alias: {
            '@app': PATHS.appSrc,
        },
        modules: [PATHS.appDirectory, PATHS.appNodeModules, PATHS.appSrc],
        extensions: ['.js', '.jsx'],
    },

    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: require.resolve('vue-loader'),
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false,
                        },
                    },
                },
            },
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

    plugins: [new webpack.DefinePlugin(definePluginDefinitions), new VueLoaderPlugin()],
};

export default config;
