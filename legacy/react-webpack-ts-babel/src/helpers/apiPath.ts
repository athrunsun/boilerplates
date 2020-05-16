import * as urlUtils from '@app/utils/url';

const API_PREFIX = process.env.APP_API_PREFIX as string;

const composeApiPath = (
    path: string,
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => urlUtils.createUrlWithoutServerAddress([API_PREFIX, path], pathParameters, queryParameters);

const apiPathProvider = {
    TITLE: composeApiPath('/title'),
};

export { apiPathProvider };
