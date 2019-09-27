/* eslint @typescript-eslint/no-var-requires: "off" */
const express = require('express');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const uaParser = require('ua-parser-js');
const httpProxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const debug = require('debug');

const { PATHS } = require('./paths');
const { CONFIG } = require('./config');
const applyApiMocks = require('./dev/apiMock');

const logger = debug('eng:server');

nunjucks.configure({
    noCache: process.env.NODE_ENV !== 'production',
});

const app = express();

const apiProxy = httpProxy({
    target: CONFIG.API_TARGET,
    changeOrigin: true,
    pathRewrite: { [`^${CONFIG.API_PREFIX}`]: '' },
    secure: false,
});

app.set('port', process.env.PORT || 3000);

if (CONFIG.ENABLE_MOCK) {
    logger('API mock is enabled...');
    applyApiMocks(app);
}

// This won't work since `public/index.html` is not copied to `dist`.
// app.use(history());

app.use(express.static(PATHS.appBuildOutput));

app.get('/', function(request, response) {
    // Parse the UA string to determine modulepreload support.
    const ua = uaParser(request.headers['user-agent']);

    const manifest = fs.readJsonSync(path.join(PATHS.appBuildOutput, 'manifest.json'));

    const modulepreload = fs.readJsonSync(path.join(PATHS.appBuildOutput, 'modulepreload.json'));

    const templateData = {
        manifest,
        modulepreload,
        browserSupportsModulePreload: ua.engine.name === 'Blink',
        ENV: process.env.NODE_ENV || 'development',
    };

    response.send(nunjucks.render(PATHS.appIndexHtml, templateData));
});

app.use(`${CONFIG.API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), err => {
    logger(`App is running:\nhttp://localhost:${app.get('port')}`);

    if (err) {
        logger(err);
    }
});
