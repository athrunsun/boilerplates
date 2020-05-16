import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';

import PATHS from '@eng/paths';
import webpackBaseConfig from '@eng/webpack/webpack.base.config';

const config = webpackMerge(webpackBaseConfig, {
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
                test: /(\.jsx?|\.tsx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: PATHS.tsConfigApp,
                            useBabel: true,
                            babelCore: '@babel/core',
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
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CheckerPlugin(),
    ],
});

export default config;
