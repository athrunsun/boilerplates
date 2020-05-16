import shell from 'shelljs';

import { PATHS } from '@eng/paths';

function typeCheck() {
    shell.exec(`tsc -p ${PATHS.TS_CONFIG_APP} --noEmit`);
}

function typeCheckTest() {
    shell.exec(`tsc -p ${PATHS.TS_CONFIG_TEST} --noEmit`);
}

function typeCheckWatch() {
    shell.exec(`tsc -p ${PATHS.TS_CONFIG_APP} --noEmit --watch`);
}

export { typeCheck, typeCheckTest, typeCheckWatch };
