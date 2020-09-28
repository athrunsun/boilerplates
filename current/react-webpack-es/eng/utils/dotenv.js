const path = require('path');
const fs = require('fs');

const { PATHS } = require('../paths');

const NEWLINE = '\n';
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\n|\r|\r\n/;

function log(message /*: string */) {
    console.log(`[dotenv-util][DEBUG] ${message}`);
}

/**
 * Parses src into an Object
 * @param {string | Buffer} src contents to be parsed
 * @param {{ debug?: boolean }} options additional options
 * @returns {Record<string, string>} an object with keys and values based on `src`
 */
function parse(src, options) {
    const debug = Boolean(options && options.debug);
    const obj = {};

    // convert Buffers before splitting into lines and processing
    src.toString()
        .split(NEWLINES_MATCH)
        .forEach(function (line, idx) {
            // matching "KEY' and 'VAL' in 'KEY=VAL'
            const keyValueArr = line.match(RE_INI_KEY_VAL);
            // matched?
            if (keyValueArr != null) {
                const key = keyValueArr[1];
                // default undefined or missing values to empty string
                let val = keyValueArr[2] || '';
                const end = val.length - 1;
                const isDoubleQuoted = val[0] === '"' && val[end] === '"';
                const isSingleQuoted = val[0] === "'" && val[end] === "'";

                // if single or double quoted, remove quotes
                if (isSingleQuoted || isDoubleQuoted) {
                    val = val.substring(1, end);

                    // if double quoted, expand newlines
                    if (isDoubleQuoted) {
                        val = val.replace(RE_NEWLINES, NEWLINE);
                    }
                } else {
                    // remove surrounding whitespace
                    val = val.trim();
                }

                obj[key] = val;
            } else if (debug) {
                log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
            }
        });

    return obj;
}

/**
 * Load a dotenv file into `process.env`.
 * CAUTION: dotenv will NOT override environment variables that are already set
 * https://github.com/motdotla/dotenv#what-happens-to-environment-variables-that-were-already-set
 * @param {string} envFileName
 */
function loadEnvFile(envFileName) {
    const envFilePath = path.resolve(PATHS.APP_DIRECTORY, envFileName);

    if (fs.existsSync(envFilePath)) {
        console.log(`Loading environment variables from '${envFileName}'...`);
    } else {
        console.warn(`Env file '${envFilePath}' does NOT exist, skipping...`);
        return;
    }

    const envConfig = parse(fs.readFileSync(envFilePath));

    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

module.exports = { loadEnvFile };
