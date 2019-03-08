import axios from 'axios';

import apiPathProvider from '@app/constants/apiPathProvider';

const requestTitle = () => axios.get(apiPathProvider.TITLE);

export { requestTitle };
