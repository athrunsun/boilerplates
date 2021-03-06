import * as lodash from 'lodash';
import URI from 'urijs';

const createUrl = (
    serverAddress: string,
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => {
    let joinedPath = URI.joinPaths(...(typeof urlPaths === 'string' ? [urlPaths] : urlPaths)).toString();

    if (!lodash.isEmpty(pathParameters)) {
        for (const pathParamKey of Object.keys(pathParameters)) {
            const re = new RegExp(`:${pathParamKey}`);
            joinedPath = joinedPath.replace(re, pathParameters[pathParamKey].toString());
        }
    }

    const uri = new URI(serverAddress).path(joinedPath);

    if (!lodash.isEmpty(queryParameters)) {
        for (const queryParamKey of Object.keys(queryParameters)) {
            uri.addQuery(queryParamKey, queryParameters[queryParamKey]);
        }
    }

    return uri.toString();
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
