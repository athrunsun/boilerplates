import * as urlUtils from '@/utils/url';

const API_PREFIX = process.env.REACT_PUBLIC_API_PREFIX as string;

const composeApiPath = (
    path: string,
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => urlUtils.createUrlWithoutServerAddress([API_PREFIX, path], pathParameters, queryParameters);

const apiPathProvider = {
    TITLE: composeApiPath('/title'),
};

export { apiPathProvider };
