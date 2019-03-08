import * as debug from 'debug';
import * as path from 'path';
import { Express } from 'express';

import { CONFIG } from '@eng/config';
import * as appConstants from '@app/constants';

const logger = debug('eng:dev:apiMock');

const applyApiMocks = (app: Express) => {
    app.set('json spaces', 40);

    app.get(path.resolve(CONFIG.API_PREFIX, 'title'), (request, response) =>
        response.json({
            data: appConstants.APP_TITLE,
        }),
    );
};

export default applyApiMocks;
