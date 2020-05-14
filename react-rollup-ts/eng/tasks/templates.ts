import debug from 'debug';
import path from 'path';
import fsExtra from 'fs-extra';
import nunjucks from 'nunjucks';

import { PATHS } from '@eng/paths';
import { CONFIG } from '@eng/config';
import { copyAssets } from '@eng/tasks/copy-assets';

const logger = debug('eng:tasks:templates');

async function compileTemplates() {
    logger('Compiling template...');
    const manifest = fsExtra.readJsonSync(path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.MANIFEST_FILE_NAME));
    const modulepreload = fsExtra.readJsonSync(path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.MODULE_PRELOAD_FILE_NAME));

    nunjucks.configure({
        noCache: process.env.NODE_ENV !== 'production',
    });

    const templateData = {
        ENV: process.env.NODE_ENV || 'development',
        PUBLIC_PATH: CONFIG.PUBLIC_PATH,
        TITLE: CONFIG.TITLE,
        APP_FAVICON_FILE_NAME: PATHS.APP_FAVICON_FILE_NAME,
        manifest,
        modulepreload,
    };

    await fsExtra.outputFile(
        path.resolve(
            PATHS.APP_BUILD_OUTPUT,
            CONFIG.MULTI_BUNDLES ? PATHS.APP_MULTI_BUNDLES_INDEX_HTML_FILE_NAME : PATHS.APP_INDEX_HTML_FILE_NAME,
        ),
        nunjucks.render(CONFIG.MULTI_BUNDLES ? PATHS.APP_MULTI_BUNDLES_INDEX_HTML : PATHS.APP_INDEX_HTML, templateData),
    );

    copyAssets();
    logger(`Built template: ${PATHS.APP_INDEX_HTML_FILE_NAME}\n`);
}

export { compileTemplates };
