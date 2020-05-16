/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('prettier --write "src/**/*.ts" "src/**/*.tsx" "__tests__/**/*.ts" "eng/**/*.ts" "eng/**/*.js"');
