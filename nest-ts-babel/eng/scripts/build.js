/* eslint @typescript-eslint/no-var-requires: "off" */
const shell = require('shelljs');

const PATHS = require('../paths');

shell.exec('node eng/scripts/cleanProd');
shell.exec('yarn install');
shell.exec(`tsc -p ${PATHS.TSCONFIG_PROD}`);

shell.exec(
    `babel ${PATHS.PROD_TS_BUILD_OUTPUT_DIR} --out-dir ${PATHS.PROD_BUILD_OUTPUT_DIR} --config-file ${PATHS.BABEL_CLI_CONFIG} --extensions ".js"`,
    {
        env: { ...process.env, NODE_ENV: 'production', DEBUG: 'app:*,eng:*' },
    },
);
