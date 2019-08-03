/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('yarn run ts-node --project tsconfig.webpack.json -r tsconfig-paths/register eng/prod/serve', {
    env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
