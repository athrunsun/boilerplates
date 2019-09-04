/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.exec(
    `babel ${PATHS.DEV_TS_BUILD_OUTPUT_DIR} --out-dir ${PATHS.DEV_BUILD_OUTPUT_DIR} --config-file ${PATHS.BABEL_CLI_CONFIG} --extensions ".js" --source-maps inline`,
    {
        env: { ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
    },
);

shell.exec(`node ${process.env.IS_DEBUG === 'true' ? '--inspect-brk' : ''} ${PATHS.DEV_BUILD_OUTPUT_DIR}/main`, {
    env: { ...process.env, NODE_ENV: 'development', DEBUG: 'app:*,eng:*' },
});
