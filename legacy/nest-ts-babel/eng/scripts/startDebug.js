/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node eng/scripts/start', { env: { ...process.env, IS_DEBUG: 'true' } });
