import webpackMerge from 'webpack-merge';

import webpackDevConfig from '@eng/webpack/webpack.development.config';

const config = webpackMerge(webpackDevConfig, {
    entry: {
        app: ['webpack-hot-middleware/client'],
    },
});

export default config;
