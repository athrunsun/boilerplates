/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const PATHS = {
    appDirectory,
    appPackageJson: resolveApp('package.json'),
    appPublicDirectory: resolveApp('public'),
    appIndexHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    appSrc: resolveApp('src'),
    appIndex: resolveApp('src/index.tsx'),
    appNodeModules: resolveApp('node_modules'),
    appBuildOutput: resolveApp('dist'),
    babelNodeConfig: './babel.node.config.js',
    tsConfigBase: resolveApp('tsconfig.json'),
    tsConfigApp: resolveApp('tsconfig.app.json'),
    tsConfigTest: resolveApp('tsconfig.test.json'),
    assetsPath: 'assets',
    imageAssetsPath: path.join('assets', 'img'),
    fontAssetsPath: path.join('assets', 'font'),
};

module.exports = { PATHS };
