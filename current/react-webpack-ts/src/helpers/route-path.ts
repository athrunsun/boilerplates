import * as urlUtils from '@/utils/url';

const composeRouterPath = (
    path: string,
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) => urlUtils.createUrlWithoutServerAddress(path, pathParameters, queryParameters);

const routePathProvider = {
    ROOT: composeRouterPath('/'),
    APP: composeRouterPath('/app'),
};

export { routePathProvider };
