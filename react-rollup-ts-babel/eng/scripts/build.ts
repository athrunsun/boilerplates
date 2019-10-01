import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`babel-node --config-file ${PATHS.babelNodeConfig} --extensions ".ts" eng/scripts/clean`);

shell.exec(`babel-node --config-file ${PATHS.babelNodeConfig} --extensions ".ts" eng/rollupBuild`, {
    env: { ...process.env, DEBUG: 'app:*,eng:*' },
});

shell.cp(PATHS.appFavicon, PATHS.appBuildOutput);
