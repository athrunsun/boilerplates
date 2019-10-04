import shell from 'shelljs';

import { clean } from '@eng/tasks/clean';
import { typeCheck } from '@eng/tasks/typeCheck';
import compile from './compile';

(async () => {
    clean();
    shell.exec('yarn install');
    typeCheck();
    await compile();
})();
