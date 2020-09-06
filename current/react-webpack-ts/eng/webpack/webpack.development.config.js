/* eslint @typescript-eslint/no-var-requires: "off" */
const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATHS } = require('../paths');
const { CONFIG } = require('../config');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
    output: {
        // We can't use `contenthash` here together with `HotModuleReplacementPlugin`.
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[id].[hash].bundle.js',
        path: PATHS.APP_BUILD_OUTPUT,
        publicPath: CONFIG.PUBLIC_PATH,
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
            template: PATHS.APP_INDEX_HTML,
            favicon: PATHS.APP_FAVICON,
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
});
