import axios from 'axios';

import * as apiPathHelpers from '@app/helpers/api-path';

function requestTitle() {
    return axios.get(apiPathHelpers.apiPathProvider.TITLE);
}

export { requestTitle };
