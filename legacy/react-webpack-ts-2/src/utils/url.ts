import lodash from 'lodash';
import urlJoin from 'proper-url-join';

const createUrl = (
    serverAddress: string,
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => {
    let joinedPath = urlJoin(...(lodash.isArray(urlPaths) ? urlPaths : [urlPaths]));

    if (!lodash.isEmpty(pathParameters)) {
        for (const pathParamKey of Object.keys(pathParameters)) {
            const re = new RegExp(`:${pathParamKey}`);
            joinedPath = joinedPath.replace(re, pathParameters[pathParamKey].toString());
        }
    }

    let url = urlJoin(serverAddress, joinedPath);

    if (!lodash.isEmpty(queryParameters)) {
        url = urlJoin(url, { query: queryParameters });
    }

    return url;
};

const createUrlWithServerAddress = (
    serverAddress: string,
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => {
    return createUrl(serverAddress, urlPaths, pathParameters, queryParameters);
};

const createUrlWithoutServerAddress = (
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => {
    return createUrl('', urlPaths, pathParameters, queryParameters);
};

export { createUrl, createUrlWithServerAddress, createUrlWithoutServerAddress };
