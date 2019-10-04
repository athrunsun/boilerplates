import debug from 'debug';
import express from 'express';
import serveStatic from 'serve-static';
import httpProxy from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';

import { CONFIG } from '@eng/config';

const logger = debug('eng:prod:server');

const app = express();

const apiProxy = httpProxy({
    target: CONFIG.API_TARGET,
    changeOrigin: true,
    pathRewrite: { [`^${CONFIG.API_PREFIX}`]: '' },
    secure: false,
});

app.set('port', process.env.PORT || 5000);

app.use(history());

app.use(serveStatic('dist'));

app.use(`${CONFIG.API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), (err: any) => {
    if (err) {
        logger(err);
    }

    logger(`Serving on port ${app.get('port')}...`);
});
