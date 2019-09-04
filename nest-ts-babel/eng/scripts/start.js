/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.exec('node eng/scripts/clean');
shell.exec(`tsc-watch -p ${PATHS.TSCONFIG_DEV} --onSuccess \"node eng/scripts/startOnSuccess\"`);
