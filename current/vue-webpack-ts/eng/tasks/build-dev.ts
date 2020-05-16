import { cleanAll } from '@eng/tasks/clean';
import { typeCheck } from '@eng/tasks/type-check';
import { compile } from '@eng/tasks/compile';

(async function () {
    cleanAll();
    typeCheck();
    await compile();
})();
