/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.exec('node eng/scripts/clean');
shell.exec(`tsc -p ${PATHS.TSCONFIG_DEV}`);
shell.exec('node eng/scripts/startOnSuccess');
