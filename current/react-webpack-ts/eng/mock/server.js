/* eslint @typescript-eslint/no-var-requires: "off" */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { CONFIG } = require('../config');
const { apply: applyCommonMock } = require('./common-mock');

const app = express();

const apiProxy = createProxyMiddleware({
    target: CONFIG.REACT_PUBLIC_API_TARGET,
    changeOrigin: true,
    secure: false,
});

// Apply mock before requests proxying
applyCommonMock(app);

// Proxy non-mock requests to remote server
app.use('/**', apiProxy);

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Listening on port ${app.get('port')}...`);
});
