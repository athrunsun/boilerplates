import debug from 'debug';
import path from 'path';
import fsExtra from 'fs-extra';
import nunjucks from 'nunjucks';
import shell from 'shelljs';

import { PATHS } from '@eng/paths';
import { getManifest } from '@eng/tasks/utils/assets';
import { getModulepreload } from '@eng/tasks/utils/modulepreload';

const logger = debug('eng:tasks:templates');

export default async () => {
    logger('Compiling template...');
    const manifest = getManifest();
    const modulepreload = getModulepreload();

    nunjucks.configure({
        // autoescape: false,
        // watch: false,
        noCache: process.env.NODE_ENV !== 'production',
    });

    const templateData = {
        manifest,
        modulepreload,
        ENV: process.env.NODE_ENV || 'development',
    };

    await fsExtra.outputFile(
        path.resolve(PATHS.appBuildOutput, 'index.html'),
        nunjucks.render(PATHS.appIndexHtml, templateData),
    );

    shell.cp(PATHS.appFavicon, PATHS.appBuildOutput);
    logger('Built template: index.html\n');
};
