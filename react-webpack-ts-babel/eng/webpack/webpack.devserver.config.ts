import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';

import webpackDevConfig from '@eng/webpack/webpack.development.config';

const config: webpack.Configuration = webpackMerge(webpackDevConfig, {
    entry: {
        app: ['webpack-hot-middleware/client'],
    },
});

export default config;
