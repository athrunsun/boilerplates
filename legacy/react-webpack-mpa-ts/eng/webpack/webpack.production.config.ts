import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import PATHS from '@eng/paths';
import webpackBaseConfig  from '@eng/webpack/webpack.base.config';

const config: webpack.Configuration = webpackMerge(webpackBaseConfig, {
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[id].[contenthash].bundle.js',
        path: PATHS.appBuildOutput,
        publicPath: '/',
    },

    mode: 'production',

    optimization: {
        minimize: true,
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
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.appIndexHtml,
            favicon: PATHS.appFavicon,
            inject: true,
            excludeChunks: ['mobile'],
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
        new HtmlWebpackPlugin({
            filename: 'mobile.html',
            template: PATHS.appMobileHtml,
            favicon: PATHS.appFavicon,
            inject: true,
            excludeChunks: ['app'],
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
    ],
});

export default config;
