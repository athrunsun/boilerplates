/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('yarn run start', { env: { ...process.env, ENABLE_MOCK: 'true' } });
