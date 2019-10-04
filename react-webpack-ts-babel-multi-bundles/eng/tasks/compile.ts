import debug from 'debug';

import bundles from '@eng/tasks/bundles';
import templates from '@eng/tasks/templates';

const logger = debug('eng:tasks:compile');

export default async () => {
    logger('Compiling modern and legacy script bundles...\n');
    await bundles();

    logger('Compiling templates...\n');
    await templates();

    logger('Site ready!');
};
