import * as path from 'path';
import * as debug from 'debug';
import * as express from 'express';
import * as httpProxy from 'http-proxy-middleware';
import * as history from 'connect-history-api-fallback';
import { Request, Response } from 'express-serve-static-core';
import {
    FuseBox,
    Sparky,
    Bundle,
    CSSResourcePlugin,
    CSSPlugin,
    QuantumPlugin,
    WebIndexPlugin,
    ReplacePlugin,
} from 'fuse-box';
import { TypeChecker } from 'fuse-box-typechecker';

import CONFIG from '@eng/config';
import applyApiMocks from '@eng/dev/apiMock';

const logger = debug('eng:fuse');

const getEnv = () => process.env.NODE_ENV || 'development';
const isProd = () => getEnv() === 'production';

const SRC = 'src';
const PUBLIC = 'public';
const BUILD = 'dist';
const TSCONFIG_PATH = './tsconfig.app.json';

let fuse: FuseBox;
let appBundle: Bundle;
let vendorBundle: Bundle;

const replacePluginDefinitions = {};

for (const configKey of Object.keys(CONFIG)) {
    replacePluginDefinitions[`process.env.APP_${configKey}`] = JSON.stringify(CONFIG[configKey]);
}

// Setup type check
const typeChecker = TypeChecker({
    tsConfig: TSCONFIG_PATH,
    basePath: './',
    name: 'Type checker',
});

const IS_PROD = isProd();

if (IS_PROD) {
    typeChecker.runSync();
} else {
    typeChecker.runWatch(SRC);
}

Sparky.task('config', () => {
    fuse = FuseBox.init({
        homeDir: `${SRC}/`,
        cache: !IS_PROD,
        hash: IS_PROD,
        // NOTE: generating sourcemaps for vendor bundle might be very slow for the first time.
        sourceMaps: IS_PROD ? false : { project: true, vendor: true },
        // target: 'browser',
        output: IS_PROD ? path.join(BUILD, 'static/$name.$hash.js') : path.join(BUILD, 'static/$name.js'),
        useTypescriptCompiler: true,
        // useJsNext: ['history', 'invariant', 'warning'],
        log: true,
        automaticAlias: false,
        alias: {
            '@app': '~',
        },
        plugins: [
            [CSSResourcePlugin(), CSSPlugin()],
            WebIndexPlugin({
                appendBundles: true,
                title: 'react-fusebox-typescript-boilerplate',
                template: path.join(PUBLIC, 'index.html'),
                path: '/static/',
                target: '../index.html',
            }),
            ReplacePlugin(replacePluginDefinitions),
            ...(IS_PROD
                ? [
                      QuantumPlugin({
                          bakeApiIntoBundle: 'vendor',
                          treeshake: true,
                          uglify: true,
                      }),
                  ]
                : []),
        ],
        tsConfig: TSCONFIG_PATH,
        showErrors: true,
    });

    vendorBundle = fuse.bundle('vendor').instructions(`~ index.tsx +tslib`);

    appBundle = fuse.bundle('app').instructions(`> [index.tsx]`);
});

Sparky.task('clean', () => Sparky.src(BUILD).clean(BUILD));

Sparky.task('default', ['clean', 'config'], () => {
    fuse.dev({ root: false, port: 3000 }, server => {
        const { app } = server.httpServer;

        const apiProxy = httpProxy({
            target: CONFIG.API_TARGET,
            changeOrigin: true,
            pathRewrite: { [`^${CONFIG.API_PREFIX}`]: '' },
            secure: false,
        });

        if (CONFIG.ENABLE_MOCK) {
            logger('API mock is enabled...');
            applyApiMocks(app);
        }

        app.use(history());

        const dist = path.resolve(__dirname, BUILD);
        app.use('/static/', express.static(path.join(dist, 'static')));

        app.use(`${CONFIG.API_PREFIX}/**`, apiProxy);

        app.use((req: Request, res: Response) => {
            res.sendFile(path.join(dist, 'index.html'));
        });
    });

    vendorBundle.watch();
    appBundle.hmr().watch();

    return fuse.run();
});

Sparky.task('build', ['clean', 'config'], () => fuse.run());
