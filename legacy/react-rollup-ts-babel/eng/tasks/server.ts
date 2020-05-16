import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import debug from 'debug';
import chokidar from 'chokidar';
import { debounce } from 'lodash';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { applyApiMocks } from '@eng/dev/apiMock';
import { build as rollupBuild } from '@eng/tasks/rollupBuild';
import { clean } from '@eng/tasks/clean';

const logger = debug('eng:tasks:server');

function startApp() {
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
}

async function cleanAndRollupBuild() {
    clean();
    await rollupBuild();
}

async function watch() {
    await cleanAndRollupBuild();
    logger('Watching source files for changes...');
    chokidar.watch(`${PATHS.appSrc}/**/*`, { ignoreInitial: true }).on('all', debounce(cleanAndRollupBuild, 100));
    startApp();
}

export { startApp, watch };
