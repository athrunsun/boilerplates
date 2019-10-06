import shell from 'shelljs';

import { PATHS } from '@eng/paths';

function typeCheck() {
    shell.exec(`tsc -p ${PATHS.tsConfigApp} --noEmit`);
}

function typeCheckTest() {
    shell.exec(`tsc -p ${PATHS.tsConfigTest} --noEmit`);
}

function typeCheckWatch() {
    shell.exec(`tsc -p ${PATHS.tsConfigApp} --noEmit --watch`);
}

export { typeCheck, typeCheckTest, typeCheckWatch };
