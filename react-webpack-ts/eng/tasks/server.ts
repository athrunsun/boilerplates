import debug from 'debug';
import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import chokidar from 'chokidar';
import { debounce } from 'lodash';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { applyApiMocks } from '@eng/dev/apiMock';
import { clean } from '@eng/tasks/clean';
import { compile } from '@eng/tasks/compile';
import { resetManifest } from '@eng/tasks/utils/assets';
import { resetModulepreload } from '@eng/tasks/utils/modulepreload';

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
        applyApiMocks(app);
    }

    app.use(history());

    app.use(express.static(PATHS.APP_BUILD_OUTPUT));

    app.get('/', function (request, response) {
        response.send(path.resolve(PATHS.APP_BUILD_OUTPUT, 'index.html'));
    });

    app.use(`${CONFIG.REACT_APP_API_PREFIX}/**`, apiProxy);

    app.listen(app.get('port'), (err: any) => {
        logger(`App is running:\nhttp://localhost:${app.get('port')}`);

        if (err) {
            logger(err);
        }
    });
}

async function cleanAndCompile() {
    resetManifest();
    resetModulepreload();
    await compile();
    await clean();
}

async function watch() {
    await cleanAndCompile();
    logger('Watching source files for changes...');
    chokidar.watch(`${PATHS.APP_SRC}/**/*`, { ignoreInitial: true }).on('all', debounce(cleanAndCompile, 100));
    startApp();
}

export { startApp, watch };
