const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

const { CONFIG } = require('../config');

const app = express();

const apiProxy = createProxyMiddleware({
    target: CONFIG.REACT_PUBLIC_API_TARGET,
    changeOrigin: true,
    pathRewrite: { [`^${CONFIG.REACT_PUBLIC_API_PREFIX}`]: '' },
    secure: false,
});

app.set('port', process.env.PORT || 5000);

app.use(history());

app.use(express.static('dist'));

app.use(`${CONFIG.REACT_PUBLIC_API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Serving on port ${app.get('port')}...`);
});
