import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import { PATHS } from '@eng/paths';
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
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
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
            },
        ],
    },

    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.appIndexHtml,
            favicon: PATHS.appFavicon,
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
});

export default config;
