import axios from 'axios';

import * as apiPathHelpers from '@/helpers/api-path';

const requestTitle = () => axios.get(apiPathHelpers.apiPathProvider.TITLE);

export { requestTitle };
