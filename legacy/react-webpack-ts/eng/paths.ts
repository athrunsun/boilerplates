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
    appNodeModules: resolveApp('node_modules'),
    appBuildOutput: resolveApp('dist'),
    tsConfigBase: resolveApp('tsconfig.json'),
    tsConfigApp: resolveApp('tsconfig.app.json'),
    tsConfigAppBabel: resolveApp('tsconfig.app.babel.json'),
    tsConfigTest: resolveApp('tsconfig.test.json'),
    tsConfigWebpack: resolveApp('tsconfig.webpack.json'),
    assetsPath: 'assets',
    imageAssetsPath: path.join('assets', 'img'),
    fontAssetsPath: path.join('assets', 'font'),
};

export { PATHS };
