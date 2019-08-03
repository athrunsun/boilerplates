/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('yarn run ts-node --project tsconfig.webpack.json -r tsconfig-paths/register eng/dev/server', {
    env: { ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
});
