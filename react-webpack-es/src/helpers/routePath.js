import * as urlUtils from '@app/utils/urlUtil';

const composeRouterPath = (path, pathParameters = {}, queryParameters = {}) =>
    urlUtils.createUrlWithoutServerAddress(path, pathParameters, queryParameters);

const routePathProvider = {
    ROOT: composeRouterPath('/'),
    APP: composeRouterPath('/app'),
    ERROR_BOUNDARY_TEST: composeRouterPath('/app/error'),
};

export { routePathProvider };
