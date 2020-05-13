import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`babel-node --config-file ${PATHS.BABEL_CONFIG_NODE} --extensions ".ts" eng/tasks/build-dev`, {
    env: { CONFIG_ENV: 'development', ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
});
