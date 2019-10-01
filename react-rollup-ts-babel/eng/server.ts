import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import httpProxy from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import debug from 'debug';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { applyApiMocks } from '@eng/dev/apiMock';

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

app.use(history());

app.use(express.static(PATHS.appBuildOutput));

app.get('/', function(request, response) {
    response.send(path.resolve(PATHS.appBuildOutput, 'index.html'));
});

app.use(`${CONFIG.API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), (err: any) => {
    logger(`App is running:\nhttp://localhost:${app.get('port')}`);

    if (err) {
        logger(err);
    }
});
