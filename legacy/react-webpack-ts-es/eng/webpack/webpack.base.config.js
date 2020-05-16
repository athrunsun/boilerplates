import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import PATHS from '@eng/paths';
import CONFIG from '@eng/config';

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
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: PATHS.tsConfigBase })],
    },

    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.ico$/],
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/assets/[name].[contenthash].[ext]',
                    },
                },
            },
            {
                test: [/\.ttf$/, /\.eot$/, /\.woff$/, /\.woff2$/],
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'static/assets/[name].[contenthash].[ext]',
                    },
                },
            },
        ],
    },

    plugins: [new webpack.DefinePlugin(definePluginDefinitions)],
};

export default config;
