import * as urlUtils from '@/utils/url';

const composeRouterPath = (path, pathParameters = {}, queryParameters = {}) =>
    urlUtils.createUrlWithoutServerAddress(path, pathParameters, queryParameters);

const routePathProvider = {
    ROOT: composeRouterPath('/'),
    APP: composeRouterPath('/app'),
};

export { routePathProvider };
