import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`babel-node --config-file ${PATHS.babelNodeConfig} --extensions ".ts" eng/tasks/serve`, {
    env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
