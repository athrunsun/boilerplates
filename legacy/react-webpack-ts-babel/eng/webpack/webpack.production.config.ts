import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import webpackBaseConfig from '@eng/webpack/webpack.base.config';

const config: webpack.Configuration = webpackMerge(webpackBaseConfig, {
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[id].[contenthash].bundle.js',
        path: PATHS.appBuildOutput,
        publicPath: CONFIG.PUBLIC_PATH,
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

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.appIndexHtml,
            favicon: PATHS.appFavicon,
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

export default config;
