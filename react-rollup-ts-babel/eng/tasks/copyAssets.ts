import shell from 'shelljs';

import { PATHS } from '@eng/paths';

function copyAssets() {
    shell.cp(PATHS.appFavicon, PATHS.appBuildOutput);
}

export { copyAssets };
