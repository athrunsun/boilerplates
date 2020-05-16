/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths.node');

shell.exec(`babel-node --config-file ${PATHS.BABEL_NODE_CONFIG} --extensions ".ts" eng/dev/server`, {
    env: { ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
});
