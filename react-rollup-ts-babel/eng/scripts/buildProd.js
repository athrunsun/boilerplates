/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node eng/scripts/build', {
    env: { ...process.env, NODE_ENV: 'production' },
});
