import { cleanAll } from '@eng/tasks/clean';
import { yarnInstall } from '@eng/tasks/yarn-install';
import { typeCheck } from '@eng/tasks/type-check';
import { compile } from '@eng/tasks/compile';

(async function () {
    yarnInstall();
    cleanAll();
    typeCheck();
    await compile();
})();
