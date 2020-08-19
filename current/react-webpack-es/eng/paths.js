const path = require('path');
const fs = require('fs');

const APP_DIRECTORY = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(APP_DIRECTORY, relativePath);

const PATHS = {
    APP_DIRECTORY,
    APP_PACKAGE_JSON: resolveApp('package.json'),
    APP_PUBLIC_DIRECTORY: resolveApp('public'),
    APP_INDEX_HTML: resolveApp('public/index.html'),
    APP_FAVICON: resolveApp('public/favicon.ico'),
    APP_SRC: resolveApp('src'),
    APP_INDEX: resolveApp('src/index.jsx'),
    APP_NODE_MODULES: resolveApp('node_modules'),
    APP_BUILD_OUTPUT: resolveApp('dist'),
    ASSETS_PATH: 'assets',
    IMAGE_ASSETS_PATH: path.join('assets', 'img'),
    FONT_ASSETS_PATH: path.join('assets', 'font'),
};

module.exports = { PATHS };
