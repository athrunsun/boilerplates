import axios from 'axios';

import * as apiPathHelpers from '@app/helpers/apiPath';

const requestTitle = () => axios.get(apiPathHelpers.apiPathProvider.TITLE);

export { requestTitle };
