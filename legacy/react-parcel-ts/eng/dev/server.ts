import * as debug from 'debug';
import * as express from 'express';
import * as ParcelBundler from 'parcel-bundler';
import * as httpProxy from 'http-proxy-middleware';
import * as history from 'connect-history-api-fallback';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import applyApiMocks from '@eng/dev/apiMock';

const logger = debug('eng:dev:server');

const app = express();

const bundler = new ParcelBundler(PATHS.appIndexHtml);

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

app.use(bundler.middleware());

app.use(`${CONFIG.API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), (err: any) => {
    if (err) {
        logger(err);
    }

    logger(`Listening on port ${app.get('port')}...`);
});
