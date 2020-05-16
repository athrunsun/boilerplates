import { clean } from '@eng/tasks/clean';
import { typeCheck } from '@eng/tasks/type-check';
import { compile } from '@eng/tasks/compile';

(async function () {
    clean();
    typeCheck();
    await compile();
})();
