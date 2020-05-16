import * as debug from 'debug';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

import { PATHS } from '@eng/paths';

const logger = debug('eng:config');

let envFileName = `.env.${process.env.NODE_ENV}`;

if (process.env.SERVE_PROD_BUNDLE_ON_DEV === 'true') {
    logger('Will serve production bundle on dev...');
    envFileName = '.env.development';
}

logger(`Will load environment variables from '${envFileName}'...`);

const envFilePath = path.resolve(PATHS.appDirectory, envFileName);

if (!fs.existsSync(envFilePath)) {
    throw new Error(`Env file '${envFilePath}' does NOT exist!`);
}

dotenv.config({ path: envFilePath });

const CONFIG = {
    ENABLE_MOCK: process.env.ENABLE_MOCK === 'true',
    API_PREFIX: process.env.API_PREFIX!,
    API_TARGET: process.env.API_TARGET!,
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

export { CONFIG };
