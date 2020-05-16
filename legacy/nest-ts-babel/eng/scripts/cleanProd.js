/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.rm('-rf', PATHS.PROD_TS_BUILD_OUTPUT_DIR);
shell.rm('-rf', PATHS.PROD_BUILD_OUTPUT_DIR);
