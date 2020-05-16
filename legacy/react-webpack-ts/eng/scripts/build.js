/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths.node');

shell.exec('node eng/scripts/clean');
shell.exec('yarn install');

shell.exec(`ts-node --project ${PATHS.TSCONFIG_WEBPACK} -r tsconfig-paths/register eng/prod/build`, {
    env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
