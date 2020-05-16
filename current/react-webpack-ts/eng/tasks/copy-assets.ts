import shell from 'shelljs';

import { PATHS } from '@eng/paths';

function copyAssets() {
    shell.cp(PATHS.APP_FAVICON, PATHS.APP_BUILD_OUTPUT);
}

export { copyAssets };
