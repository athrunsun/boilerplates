import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const PATHS = {
    appDirectory,
    appPackageJson: resolveApp('package.json'),
    appIndexHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    appSrc: resolveApp('src'),
    appIndex: resolveApp('src/index.js'),
    appNodeModules: resolveApp('node_modules'),
    appBuildOutput: resolveApp('dist'),
    tsConfigBase: resolveApp('tsconfig.json'),
    tsConfigApp: resolveApp('tsconfig.app.json'),
    tsConfigTest: resolveApp('tsconfig.test.json'),
};

export default PATHS;
