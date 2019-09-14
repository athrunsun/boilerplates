/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths.node');

shell.exec(`ts-node --project ${PATHS.TSCONFIG_WEBPACK} -r tsconfig-paths/register eng/prod/serve`, {
    env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
