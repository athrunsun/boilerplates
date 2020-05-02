import { cleanAll } from '@eng/tasks/clean';
import { yarnInstall } from '@eng/tasks/yarnInstall';
import { typeCheck } from '@eng/tasks/typeCheck';
import { compile } from '@eng/tasks/compile';

(async function() {
    yarnInstall();
    cleanAll();
    typeCheck();
    await compile();
})();
