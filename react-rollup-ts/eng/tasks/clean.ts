import shell from 'shelljs';

import { PATHS } from '@eng/paths';

function clean() {
    shell.rm('-rf', PATHS.APP_BUILD_OUTPUT);
}

export { clean };
