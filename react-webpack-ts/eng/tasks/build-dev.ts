import { cleanAll } from '@eng/tasks/clean';
import { typeCheck } from '@eng/tasks/typeCheck';
import { compile } from '@eng/tasks/compile';

(async function () {
    cleanAll();
    typeCheck();
    await compile();
})();
