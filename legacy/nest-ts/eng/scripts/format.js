/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('prettier --write "src/**/*.ts" "test/**/*.ts"');
