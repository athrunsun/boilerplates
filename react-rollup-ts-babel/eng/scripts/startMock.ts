import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`babel-node --config-file ${PATHS.babelNodeConfig} --extensions ".ts" eng/tasks/watch`, {
    env: { ...process.env, NODE_ENV: 'development', ENABLE_MOCK: 'true', DEBUG: 'app:*,eng:*' },
});
