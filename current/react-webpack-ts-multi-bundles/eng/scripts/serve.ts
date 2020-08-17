import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(`babel-node --config-file ${PATHS.BABEL_CONFIG_NODE} --extensions ".ts" eng/tasks/serve`, {
    env: { CONFIG_ENV: 'production', ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
