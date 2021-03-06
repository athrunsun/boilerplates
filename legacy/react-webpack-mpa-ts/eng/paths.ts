import * as path from 'path';
import * as fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const PATHS = {
    appDirectory,
    appPackageJson: resolveApp('package.json'),
    appIndexHtml: resolveApp('public/index.html'),
    appMobileHtml: resolveApp('public/mobile.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    appSrc: resolveApp('src'),
    appIndex: resolveApp('src/index.tsx'),
    appMobile: resolveApp('src/mobile.tsx'),
    appNodeModules: resolveApp('node_modules'),
    appBuildOutput: resolveApp('dist'),
    tsConfigBase: resolveApp('tsconfig.json'),
    tsConfigApp: resolveApp('tsconfig.app.json'),
    tsConfigTest: resolveApp('tsconfig.test.json'),
};

export default PATHS;
