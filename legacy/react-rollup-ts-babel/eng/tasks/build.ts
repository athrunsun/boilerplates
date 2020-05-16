import { clean } from '@eng/tasks/clean';
import { yarnInstall } from '@eng/tasks/yarnInstall';
import { typeCheck } from '@eng/tasks/typeCheck';
import { build as rollupBuild } from '@eng/tasks/rollupBuild';

(async function() {
    yarnInstall();
    clean();
    typeCheck();
    await rollupBuild();
})();
