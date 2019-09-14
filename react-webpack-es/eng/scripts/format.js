/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('prettier --write "src/**/*.js" "src/**/*.jsx" "__tests__/**/*.js" "eng/**/*.js" "eng/**/*.js"');
