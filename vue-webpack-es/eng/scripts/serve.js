/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths.node');

shell.exec(`babel-node --config-file ${PATHS.BABEL_NODE_CONFIG} --extensions ".js" eng/prod/serve`, {
    env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
});
