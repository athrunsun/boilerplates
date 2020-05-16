/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node --inspect-brk -r tsconfig-paths/register -r ts-node/register src/main.ts');
