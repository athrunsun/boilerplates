/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

shell.exec('yarn run serve', { env: { ...process.env, SERVE_PROD_BUNDLE_ON_DEV: 'true' } });
