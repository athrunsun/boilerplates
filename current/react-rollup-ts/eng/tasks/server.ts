import debug from 'debug';
import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import chokidar from 'chokidar';
import { debounce } from 'lodash';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { applyApiMocks } from '@eng/dev/api-mock';
import { compile } from '@eng/tasks/compile';
import { clean } from '@eng/tasks/clean';

const logger = debug('eng:tasks:server');

function startApp() {
    const app = express();

    const apiProxy = createProxyMiddleware({
        target: CONFIG.REACT_APP_API_TARGET,
        changeOrigin: true,
        pathRewrite: { [`^${CONFIG.REACT_APP_API_PREFIX}`]: '' },
        secure: false,
    });

    app.set('port', process.env.PORT || 3000);

    if (CONFIG.ENABLE_MOCK) {
        logger('API mock is enabled...');
        applyApiMocks(app, false);
    }

    app.use(history());

    app.use(express.static(PATHS.APP_BUILD_OUTPUT));

    app.get('/', function (request, response) {
        response.send(path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.APP_INDEX_HTML_FILE_NAME));
    });

    app.use(`${CONFIG.REACT_APP_API_PREFIX}/**`, apiProxy);

    app.listen(app.get('port'), (err: any) => {
        logger(`App is running:\nhttp://localhost:${app.get('port')}`);

        if (err) {
            logger(err);
        }
    });
}

function startStandAloneMockServer() {
    const app = express();

    const apiProxy = createProxyMiddleware({
        // Should be set to real API server address
        target: 'http://localhost:5000',

        changeOrigin: true,
        secure: false,
    });

    // Apply mock before requests proxying
    applyApiMocks(app, true);

    // Proxy non-mock requests to remote server
    app.use('/**', apiProxy);

    app.set('port', process.env.PORT || 4000);

    app.listen(app.get('port'), (err: any) => {
        logger(`Stand-alone mock server is running:\nhttp://localhost:${app.get('port')}`);

        if (err) {
            logger(err);
        }
    });
}

async function cleanAndCompile() {
    clean();
    await compile();
}

async function watch() {
    await cleanAndCompile();
    logger('Watching source files for changes...');
    chokidar.watch(`${PATHS.APP_SRC}/**/*`, { ignoreInitial: true }).on('all', debounce(cleanAndCompile, 100));
    startApp();
}

export { startApp, startStandAloneMockServer, watch };
