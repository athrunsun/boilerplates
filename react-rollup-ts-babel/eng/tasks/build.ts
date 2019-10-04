import shell from 'shelljs';

import { clean } from '@eng/tasks/clean';
import { typeCheck } from '@eng/tasks/typeCheck';
import { build as rollupBuild } from '@eng/tasks/rollupBuild';

(async function() {
    clean();
    shell.exec('yarn install');
    typeCheck();
    await rollupBuild();
})();
