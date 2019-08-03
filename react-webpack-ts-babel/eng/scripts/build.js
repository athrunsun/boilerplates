/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('yarn run clean');
shell.exec('yarn install');
shell.exec('yarn run type-check');

shell.exec('yarn run ts-node --project tsconfig.webpack.json -r tsconfig-paths/register eng/prod/build', {
    env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
