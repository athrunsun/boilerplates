/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths.node');

shell.exec(`ts-node --project ${PATHS.TSCONFIG_WEBPACK} -r tsconfig-paths/register eng/dev/server`, {
    env: { ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
});
