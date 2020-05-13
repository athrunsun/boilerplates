import path from 'path';
import fs from 'fs';

const APP_DIRECTORY = fs.realpathSync(process.cwd());

function resolveApp(relativePath: string) {
    return path.resolve(APP_DIRECTORY, relativePath);
}

const PATHS = {
    APP_DIRECTORY,
    APP_PACKAGE_JSON: resolveApp('package.json'),
    APP_PUBLIC_DIRECTORY: resolveApp('public'),
    APP_INDEX_HTML: resolveApp('public/index.html'),
    APP_INDEX_HTML_FILE_NAME: 'index.html',
    APP_MULTI_BUNDLES_INDEX_HTML: resolveApp('public/index.multi-bundles.html'),
    APP_FAVICON: resolveApp('public/favicon.ico'),
    APP_FAVICON_FILE_NAME: 'favicon.ico',
    APP_SRC: resolveApp('src'),
    APP_INDEX: resolveApp('src/index.tsx'),
    APP_MAIN_ES_MODULE: resolveApp('src/main-module.ts'),
    APP_MAIN_NO_ES_MODULE: resolveApp('src/main-nomodule.ts'),
    APP_NODE_MODULES: resolveApp('node_modules'),
    APP_BUILD_OUTPUT: resolveApp('dist'),
    BABEL_CONFIG_NODE: './babel.node.config.js',
    TS_CONFIG_BASE: resolveApp('tsconfig.json'),
    TS_CONFIG_APP: resolveApp('tsconfig.app.json'),
    TS_CONFIG_TEST: resolveApp('tsconfig.test.json'),
    ASSETS_PATH: 'assets',
    IMAGE_ASSETS_PATH: path.join('assets', 'img'),
    FONT_ASSETS_PATH: path.join('assets', 'font'),
    MANIFEST_FILE_NAME: 'manifest.json',
    MANIFEST_FILE_PATH: resolveApp('public/manifest.json'),
    MODULE_PRELOAD_FILE_NAME: 'modulepreload.json',
    CSS_ASSETS_FILE_NAME: 'css-assets.json',
};

export { PATHS };
