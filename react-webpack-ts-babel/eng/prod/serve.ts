import * as debug from 'debug';
import * as express from 'express';
import * as serveStatic from 'serve-static';
import * as httpProxy from 'http-proxy-middleware';
import * as history from 'connect-history-api-fallback';

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
