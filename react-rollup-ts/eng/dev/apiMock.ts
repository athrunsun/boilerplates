import debug from 'debug';
import path from 'path';
import { Express } from 'express';

import { CONFIG } from '@eng/config';

const logger = debug('eng:dev:apiMock');

const applyApiMocks = (app: Express) => {
    app.set('json spaces', 40);

    app.get(path.posix.resolve(CONFIG.API_PREFIX, 'title'), (request, response) =>
        response.json({
            data: 'BILIBILI',
        }),
    );
};

export { applyApiMocks };
