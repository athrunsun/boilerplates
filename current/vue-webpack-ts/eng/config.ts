import lodash from 'lodash';
import debug from 'debug';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

import { PATHS } from '@eng/paths';

const VUE_APP_CONFIG_KEY_PREFIX = 'VUE_APP_';
const logger = debug('eng:config');

// Load from common `.env` file
dotenv.config();

if (lodash.isNil(process.env.CONFIG_ENV)) {
    logger('"process.env.CONFIG_ENV" not defined, skip reading environment specific dotenv file...');
} else {
    const envFileName = `.env.${process.env.CONFIG_ENV}`;

    const envFilePath = path.resolve(PATHS.APP_DIRECTORY, envFileName);

    if (!fs.existsSync(envFilePath)) {
        logger(`Env file '${envFilePath}' does NOT exist, skipping...`);
    } else {
        logger(`Loading environment variables from '${envFileName}'...`);
    }

    dotenv.config({ path: envFilePath });
}

const CONFIG = {
    TITLE: process.env.TITLE as string,
    MULTI_BUNDLES: process.env.MULTI_BUNDLES === 'true',
    OUTPUT_LEGACY_BUNDLE: process.env.OUTPUT_LEGACY_BUNDLE === 'true',
    ENABLE_MOCK: process.env.ENABLE_MOCK === 'true',
    VUE_APP_API_PREFIX: process.env.VUE_APP_API_PREFIX as string,
    VUE_APP_API_TARGET: process.env.VUE_APP_API_TARGET as string,
    PUBLIC_PATH: lodash.isEmpty(process.env.BASE_URL) ? '/' : (process.env.BASE_URL as string),
};

if (CONFIG.MULTI_BUNDLES) {
    logger('Multi-bundles mode is ON');
} else {
    logger('Multi-bundles mode is OFF');
}

const undefinedConfigEntries = [];

for (const configKey of Object.keys(CONFIG)) {
    if (CONFIG[configKey] === undefined) {
        undefinedConfigEntries.push(configKey);
    }
}

if (undefinedConfigEntries.length > 0) {
    throw new Error(`The following config entries are missing: ${undefinedConfigEntries.join(', ')}`);
}

export { VUE_APP_CONFIG_KEY_PREFIX, CONFIG };
