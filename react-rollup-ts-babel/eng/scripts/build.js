/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('node eng/scripts/clean');

shell.exec('rollup -c', {
    env: { ...process.env, DEBUG: 'app:*,eng:*' },
});
