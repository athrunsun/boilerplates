/* eslint @typescript-eslint/no-var-requires: "off" */
const { merge: webpackMerge } = require('webpack-merge');

const webpackDevConfig = require('./webpack.development.config');

module.exports = webpackMerge(webpackDevConfig, {
    entry: {
        app: ['webpack-hot-middleware/client'],
    },
});
