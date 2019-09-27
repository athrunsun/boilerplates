/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const { PATHS } = require('../paths');

shell.exec(`tsc -p ${PATHS.tsConfigApp} --noEmit`);
