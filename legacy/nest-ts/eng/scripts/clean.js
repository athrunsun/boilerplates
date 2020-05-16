/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.rm('-rf', PATHS.BUILD_OUTPUT_DIR);
