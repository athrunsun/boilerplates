/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('ts-node -r tsconfig-paths/register src/main.ts');
