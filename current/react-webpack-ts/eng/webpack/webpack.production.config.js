/* eslint @typescript-eslint/no-var-requires: "off" */
const { merge: webpackMerge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { PATHS } = require('../paths');
const { CONFIG } = require('../config');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[id].[contenthash].bundle.js',
        path: PATHS.APP_BUILD_OUTPUT,
        publicPath: CONFIG.REACT_PUBLIC_PUBLIC_PATH,
    },

    mode: 'production',

    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                // sourceMap: true,
                terserOptions: {
                    safari10: true,
                },
            }),
        ],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
            },
        ],
    },

    optimization: {
        minimize: true,
    },

    plugins: [
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
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    ],
});
