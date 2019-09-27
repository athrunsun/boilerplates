/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node eng/server', {
    env: { ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
});
