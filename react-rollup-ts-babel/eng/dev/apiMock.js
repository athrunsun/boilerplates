/* eslint @typescript-eslint/no-var-requires: "off" */
const debug = require('debug');
const path = require('path');

const { CONFIG } = require('../config');

const logger = debug('eng:dev:apiMock');

const applyApiMocks = app => {
    app.set('json spaces', 40);

    app.get(path.posix.resolve(CONFIG.API_PREFIX, 'title'), (request, response) =>
        response.json({
            data: 'BILIBILI',
        }),
    );
};

module.exports = applyApiMocks;
