import debug from 'debug';

import { bundles } from '@eng/tasks/bundles';
import { compileTemplates } from '@eng/tasks/templates';

const logger = debug('eng:tasks:compile');

async function compile() {
    logger('Creating script bundles...\n');
    await bundles();

    logger('Compiling templates...\n');
    await compileTemplates();

    logger('Compilation done!');
}

export { compile };
