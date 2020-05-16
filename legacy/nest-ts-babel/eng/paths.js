const BUILD_OUTPUT_DIR = './build';
const DEV_TS_BUILD_OUTPUT_DIR = `${BUILD_OUTPUT_DIR}/dev_tsc_output`;
const DEV_BUILD_OUTPUT_DIR = `${BUILD_OUTPUT_DIR}/dev`;
const PROD_TS_BUILD_OUTPUT_DIR = `${BUILD_OUTPUT_DIR}/prod_tsc_output`;
const PROD_BUILD_OUTPUT_DIR = `${BUILD_OUTPUT_DIR}/prod`;
const BABEL_CLI_CONFIG = './babel.cli.config.js';
const TSCONFIG_DEV = 'tsconfig.dev.json';
const TSCONFIG_PROD = 'tsconfig.prod.json';

module.exports = {
    DEV_TS_BUILD_OUTPUT_DIR,
    DEV_BUILD_OUTPUT_DIR,
    PROD_TS_BUILD_OUTPUT_DIR,
    PROD_BUILD_OUTPUT_DIR,
    BABEL_CLI_CONFIG,
    TSCONFIG_DEV,
    TSCONFIG_PROD,
};
