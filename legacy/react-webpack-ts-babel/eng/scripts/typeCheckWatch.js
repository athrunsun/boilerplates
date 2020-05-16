/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths.node');

shell.exec(`tsc -p ${PATHS.TSCONFIG_APP} --noEmit --watch`);
