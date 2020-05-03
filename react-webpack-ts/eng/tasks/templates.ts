import debug from 'debug';
import path from 'path';
import fsExtra from 'fs-extra';
import nunjucks from 'nunjucks';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { copyAssets } from '@eng/tasks/copy-assets';
import { getManifest } from '@eng/tasks/utils/assets';
import { getModulepreload } from '@eng/tasks/utils/modulepreload';
import { getManifest as getCssAssetsManifest } from '@eng/tasks/utils/css-assets';

const logger = debug('eng:tasks:templates');

async function compileTemplates() {
    logger('Compiling template...');
    const manifest = getManifest();
    const modulepreload = getModulepreload();
    const cssAssets = getCssAssetsManifest();

    nunjucks.configure({
        // autoescape: false,
        // watch: false,
        noCache: process.env.NODE_ENV !== 'production',
    });

    const templateData = {
        ENV: process.env.NODE_ENV || 'development',
        PUBLIC_PATH: CONFIG.PUBLIC_PATH,
        APP_FAVICON_FILE_NAME: PATHS.APP_FAVICON_FILE_NAME,
        manifest,
        modulepreload,
        APPLY_CSS_ASSETS: process.env.NODE_ENV === 'production',
        cssAssets,
    };

    await fsExtra.outputFile(
        path.resolve(PATHS.APP_BUILD_OUTPUT, 'index.html'),
        nunjucks.render(PATHS.APP_MULTI_BUNDLES_INDEX_HTML, templateData),
    );

    copyAssets();
    logger('Built template: index.html\n');
}

export { compileTemplates };
