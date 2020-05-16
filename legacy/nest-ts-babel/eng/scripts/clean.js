/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.rm('-rf', PATHS.DEV_TS_BUILD_OUTPUT_DIR);
shell.rm('-rf', PATHS.DEV_BUILD_OUTPUT_DIR);
