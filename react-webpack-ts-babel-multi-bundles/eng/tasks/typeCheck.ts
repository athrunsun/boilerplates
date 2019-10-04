import shell from 'shelljs';

import { PATHS } from '@eng/paths';

function typeCheck() {
    shell.exec(`tsc -p ${PATHS.tsConfigApp} --noEmit`);
}

export { typeCheck };
