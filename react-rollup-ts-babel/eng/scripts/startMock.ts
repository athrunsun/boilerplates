import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`babel-node --config-file ${PATHS.babelNodeConfig} --extensions ".ts" eng/scripts/startDev`, {
    env: { ...process.env, ENABLE_MOCK: 'true', DEBUG: 'app:*,eng:*' },
});
