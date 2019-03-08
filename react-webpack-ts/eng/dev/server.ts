import * as debug from 'debug';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as httpProxy from 'http-proxy-middleware';
import * as history from 'connect-history-api-fallback';

import webpackConfig from '@eng/webpack/webpack.devserver.config';
import { CONFIG } from '@eng/config';
import applyApiMocks from '@eng/dev/apiMock';

const logger = debug('eng:dev:server');

const app = express();
const compiler = webpack(webpackConfig);

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

app.use(
    webpackDevMiddleware(compiler, {
        stats: {
            colors: true,
        },
        publicPath: webpackConfig.output!.publicPath!,
    }),
);

app.use(webpackHotMiddleware(compiler));

app.use(`${CONFIG.API_PREFIX}/**`, apiProxy);

app.listen(app.get('port'), (err: any) => {
    if (err) {
        logger(err);
    }

    logger(`Listening on port ${app.get('port')}...`);
});
