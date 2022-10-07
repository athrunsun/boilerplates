const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

const webpackConfig = require('../webpack/webpack.devserver.config');
const { CONFIG } = require('../config');

const app = express();
const compiler = webpack(webpackConfig);

let devServerProxyTarget = CONFIG.REACT_PUBLIC_API_TARGET;

if (CONFIG.REACT_APP_ENABLE_API_MOCK) {
    console.log('API mock is enabled...');
    devServerProxyTarget = CONFIG.REACT_PUBLIC_API_TARGET_MOCK;
}

const apiProxy = createProxyMiddleware({
    target: devServerProxyTarget,
    changeOrigin: true,
    pathRewrite: { [`^${CONFIG.REACT_PUBLIC_API_PREFIX}`]: '' },
    secure: false,
});

app.set('port', process.env.PORT || 3000);

app.use(history());

const devMiddleware = webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
    },
    publicPath: webpackConfig.output.publicPath,
});

devMiddleware.waitUntilValid((stats) => {
    // console.log(stats);
    console.log(`Listening on port ${app.get('port')}...`);
});

app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler));

app.use(`${CONFIG.REACT_PUBLIC_API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), (err) => {
    if (err) {
        console.error(err);
    }
});
