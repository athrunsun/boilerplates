import * as commonUtils from '@/utils/common';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseUrl The base URL
 * @param {string} relativeUrl The relative URL
 * @returns {string} The combined URL
 */
function combineUrl(baseUrl: string, relativeUrl: string): string {
    return relativeUrl ? baseUrl.replace(/\/+$/, '') + '/' + relativeUrl.replace(/^\/+/, '') : baseUrl;
}

function combineMultipleUrls(baseUrl: string, relativeUrls: string[]) {
    return relativeUrls.reduce((accumulator, currentValue) => combineUrl(accumulator, currentValue), baseUrl);
}

function processPathParameters(url: string, pathParameters: { [key: string]: string | number }) {
    for (const pathParamKey of Object.keys(pathParameters)) {
        const re = new RegExp(`:${pathParamKey}`);
        url = url.replace(re, pathParameters[pathParamKey].toString());
    }

    return url;
}

function processQueryParameters(url: string, queryParameters: { [key: string]: string | number }) {
    const query = [];

    for (const [key, value] of Object.entries(queryParameters)) {
        query.push(`${key}=${encodeURIComponent(value)}`);
    }

    url = `${url}?${query.join('&')}`;
    return url;
}

function createUrl(
    serverAddress: string,
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) {
    let url = combineMultipleUrls(serverAddress, commonUtils.isArray(urlPaths) ? urlPaths : [urlPaths]);

    if (!commonUtils.isEmpty(pathParameters)) {
        url = processPathParameters(url, pathParameters);
    }

    if (!commonUtils.isEmpty(queryParameters)) {
        url = processQueryParameters(url, queryParameters);
    }

    return url;
}

function createUrlWithServerAddress(
    serverAddress: string,
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) {
    return createUrl(serverAddress, urlPaths, pathParameters, queryParameters);
}

function createUrlWithoutServerAddress(
    urlPaths: string | string[],
    pathParameters: { [key: string]: string | number } = {},
    queryParameters: { [key: string]: string | number } = {},
) {
    return createUrl('', urlPaths, pathParameters, queryParameters);
}

export { createUrl, createUrlWithServerAddress, createUrlWithoutServerAddress };
