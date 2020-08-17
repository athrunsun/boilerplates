import shell from 'shelljs';

import { PATHS } from '@eng/paths';

shell.exec(
    `babel-node --config-file ${PATHS.BABEL_CONFIG_NODE} --extensions ".ts" eng/tasks/start-stand-alone-mock-server`,
    {
        env: {
            ...process.env,
            DEBUG: 'app:*,eng:*',
        },
    },
);
