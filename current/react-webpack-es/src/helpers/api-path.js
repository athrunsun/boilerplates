import * as urlUtils from '@/utils/url';

const API_PREFIX = process.env.REACT_PUBLIC_API_PREFIX;

const composeApiPath = (path, pathParameters = {}, queryParameters = {}) =>
    urlUtils.createUrlWithoutServerAddress([API_PREFIX, path], pathParameters, queryParameters);

const apiPathProvider = {
    TITLE: composeApiPath('/title'),
};

export { apiPathProvider };
