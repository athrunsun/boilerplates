const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const { PATHS } = require('./paths');
const commonUtils = require('./utils/common');

const REACT_PUBLIC_CONFIG_KEY_PREFIX = 'REACT_PUBLIC_';

/**
 * dotenv will NOT override environment variables that are already set
 * https://github.com/motdotla/dotenv#what-happens-to-environment-variables-that-were-already-set
 */
function loadEnvFile(envFileName) {
    const envFilePath = path.resolve(PATHS.APP_DIRECTORY, envFileName);

    if (fs.existsSync(envFilePath)) {
        console.log(`Loading environment variables from '${envFileName}'...`);
    } else {
        console.warn(`Env file '${envFilePath}' does NOT exist, skipping...`);
        return;
    }

    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

// Load from default `.env` file
loadEnvFile('.env');

if (process.env.CONFIG_ENV == null) {
    console.warn('"process.env.CONFIG_ENV" not defined, skip reading environment specific dotenv file...');
} else {
    const envFileName = `.env.${process.env.CONFIG_ENV}`;
    loadEnvFile(envFileName);
}

const CONFIG = {
    REACT_APP_ENABLE_API_MOCK: process.env.REACT_APP_ENABLE_API_MOCK === 'true',
    REACT_PUBLIC_API_PREFIX: process.env.REACT_PUBLIC_API_PREFIX,
    REACT_PUBLIC_API_TARGET: process.env.REACT_PUBLIC_API_TARGET,
    REACT_PUBLIC_API_TARGET_MOCK: process.env.REACT_PUBLIC_API_TARGET_MOCK,
    REACT_PUBLIC_PUBLIC_PATH: commonUtils.isEmpty(process.env.BASE_URL) ? '/' : process.env.BASE_URL,
};

const undefinedConfigEntries = [];

for (const configKey of Object.keys(CONFIG)) {
    if (CONFIG[configKey] === undefined) {
        undefinedConfigEntries.push(configKey);
    }
}

if (undefinedConfigEntries.length > 0) {
    throw new Error(`The following config entries are missing: ${undefinedConfigEntries.join(', ')}`);
}

module.exports = { REACT_PUBLIC_CONFIG_KEY_PREFIX, CONFIG };
