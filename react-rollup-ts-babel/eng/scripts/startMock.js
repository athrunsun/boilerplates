/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node eng/scripts/startDev', {
    env: { ...process.env, ENABLE_MOCK: 'true', DEBUG: 'app:*,eng:*' },
});
