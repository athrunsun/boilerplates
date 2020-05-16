import debug from 'debug';

import { bundles } from '@eng/tasks/bundles';
import { compileTemplates } from '@eng/tasks/templates';

const logger = debug('eng:tasks:compile');

async function compile() {
    logger('Compiling modern and legacy script bundles...\n');
    await bundles();

    logger('Compiling templates...\n');
    await compileTemplates();

    logger('Site ready!');
}

export { compile };
