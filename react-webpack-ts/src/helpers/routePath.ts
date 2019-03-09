import * as urlUtils from '@app/utils/urlUtil';

const composeRouterPath = (
    path: string,
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => urlUtils.createUrlWithoutServerAddress(path, pathParameters, queryParameters);

const routePathProvider = {
    ROOT: composeRouterPath('/'),
    APP: composeRouterPath('/app'),
    ERROR_BOUNDARY_TEST: composeRouterPath('/app/error'),
    DYNAMIC_LOAD_TEST: composeRouterPath('/app/dynamic'),
};

export { routePathProvider };
