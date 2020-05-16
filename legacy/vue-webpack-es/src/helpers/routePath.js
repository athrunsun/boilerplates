import * as urlUtils from '@app/utils/url';

const composeRouterPath = (path, pathParameters = {}, queryParameters = {}) =>
    urlUtils.createUrlWithoutServerAddress(path, pathParameters, queryParameters);

const routePathProvider = {
    ROOT: composeRouterPath('/'),
    APP: composeRouterPath('/app'),
    DYNAMIC_COMP_TEST: composeRouterPath('/app/dynamic'),
};

export { routePathProvider };
