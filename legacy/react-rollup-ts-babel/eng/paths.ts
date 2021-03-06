import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const PATHS = {
    appDirectory,
    appPackageJson: resolveApp('package.json'),
    appPublicDirectory: resolveApp('public'),
    appIndexHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    appSrc: resolveApp('src'),
    appIndex: resolveApp('src/index.tsx'),
    appMainESModule: resolveApp('src/main-module.ts'),
    appMainNoESModule: resolveApp('src/main-nomodule.ts'),
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

export { PATHS };
