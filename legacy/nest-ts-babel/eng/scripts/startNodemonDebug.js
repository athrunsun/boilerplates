/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node eng/scripts/startNodemon', { env: { ...process.env, IS_DEBUG: 'true' } });
