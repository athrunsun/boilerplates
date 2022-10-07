const commonUtils = require('./utils/common');
const dotenvUtils = require('./utils/dotenv');

const REACT_PUBLIC_CONFIG_KEY_PREFIX = 'REACT_PUBLIC_';

function composeWebpackDefinePluginDefinitions() {
    const definePluginDefinitions = { 'process.env': {} };

    for (const configKey of Object.keys(CONFIG)) {
        definePluginDefinitions['process.env'][configKey] = JSON.stringify(CONFIG[configKey]);
    }

    for (const envKey of Object.keys(process.env)) {
        // Will NOT override already processed keys
        if (
            envKey.startsWith(REACT_PUBLIC_CONFIG_KEY_PREFIX) &&
            definePluginDefinitions['process.env'][envKey] == null
        ) {
            definePluginDefinitions['process.env'][envKey] = JSON.stringify(process.env[envKey]);
        }
    }

    return definePluginDefinitions;
}

// Load from default `.env` file
dotenvUtils.loadEnvFile('.env');

if (process.env.CONFIG_ENV == null) {
    console.warn('"process.env.CONFIG_ENV" not defined, skip reading environment specific dotenv file...');
} else {
    const envFileName = `.env.${process.env.CONFIG_ENV}`;
    dotenvUtils.loadEnvFile(envFileName);
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

module.exports = { REACT_PUBLIC_CONFIG_KEY_PREFIX, CONFIG, composeWebpackDefinePluginDefinitions };
