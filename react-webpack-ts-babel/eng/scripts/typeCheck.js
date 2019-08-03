/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('yarn run tsc -p tsconfig.app.json --noEmit');
