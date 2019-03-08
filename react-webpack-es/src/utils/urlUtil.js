import lodash from 'lodash';
import URI from 'urijs';

const createUrlWithServerAddress = (serverAddress, urlPaths, pathParameters = {}, queryParameters = {}) => {
    return createUrl(serverAddress, urlPaths, pathParameters, queryParameters);
};

const createUrlWithoutServerAddress = (urlPaths, pathParameters = {}, queryParameters = {}) => {
    return createUrl('', urlPaths, pathParameters, queryParameters);
};

const createUrl = (serverAddress, urlPaths, pathParameters = {}, queryParameters = {}) => {
    let joinedPath = URI.joinPaths(...(typeof urlPaths === 'string' ? [urlPaths] : urlPaths)).toString();

    if (!lodash.isEmpty(pathParameters)) {
        for (const pathParamKey of Object.keys(pathParameters)) {
            const re = new RegExp(`:${pathParamKey}`);
            joinedPath = joinedPath.replace(re, pathParameters[pathParamKey].toString());
        }
    }

    const uri = new URI(serverAddress).path(joinedPath);

    if (!lodash.isEmpty(pathParameters)) {
        for (const queryParamKey of Object.keys(queryParameters)) {
            uri.addQuery(queryParamKey, queryParameters[queryParamKey]);
        }
    }

    return uri.toString();
};

export { createUrl, createUrlWithServerAddress, createUrlWithoutServerAddress };
