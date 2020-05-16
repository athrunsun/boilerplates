import debug from 'debug';
import path from 'path';

import CONFIG from '@eng/config';
import * as appConstants from '@app/constants';

const logger = debug('eng:dev:apiMock');

const applyApiMocks = app => {
    app.set('json spaces', 40);

    app.get(path.resolve(CONFIG.API_PREFIX, 'title'), (request, response) =>
        response.json({
            data: appConstants.APP_TITLE,
        }),
    );
};

export default applyApiMocks;
