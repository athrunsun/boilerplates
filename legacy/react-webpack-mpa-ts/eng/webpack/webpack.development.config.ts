import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';

import PATHS from '@eng/paths';
import webpackBaseConfig from '@eng/webpack/webpack.base.config';

const config: webpack.Configuration = webpackMerge(webpackBaseConfig, {
    output: {
        // We can't use `contenthash` here together with `HotModuleReplacementPlugin`.
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[id].[hash].bundle.js',
        path: PATHS.appBuildOutput,
        publicPath: '/',
        pathinfo: true,
    },

    mode: 'development',

    optimization: {
        minimize: false,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: PATHS.tsConfigApp,
                            useCache: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },

    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.appIndexHtml,
            favicon: PATHS.appFavicon,
            inject: true,
            excludeChunks: ['mobile'],
        }),
        new HtmlWebpackPlugin({
            filename: 'mobile.html',
            template: PATHS.appMobileHtml,
            favicon: PATHS.appFavicon,
            inject: true,
            excludeChunks: ['app'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CheckerPlugin(),
    ],
});

export default config;
