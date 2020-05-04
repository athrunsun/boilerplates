import * as urlUtils from '@app/utils/url';

const API_PREFIX = process.env.VUE_APP_API_PREFIX as string;

function composeApiPath(
    path: string,
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) {
    return urlUtils.createUrlWithoutServerAddress([API_PREFIX, path], pathParameters, queryParameters);
}

const apiPathProvider = {
    TITLE: composeApiPath('/title'),
};

export { apiPathProvider };
