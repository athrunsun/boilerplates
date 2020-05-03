import debug from 'debug';
import path from 'path';
import fsExtra from 'fs-extra';
import nunjucks from 'nunjucks';

import { PATHS } from '@eng/paths';
import { copyAssets } from '@eng/tasks/copyAssets';
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
        manifest,
        modulepreload,
        cssAssets,
        ENV: process.env.NODE_ENV || 'development',
    };

    await fsExtra.outputFile(
        path.resolve(PATHS.APP_BUILD_OUTPUT, 'index.html'),
        nunjucks.render(PATHS.APP_MULTI_BUNDLES_INDEX_HTML, templateData),
    );

    copyAssets();
    logger('Built template: index.html\n');
}

export { compileTemplates };
