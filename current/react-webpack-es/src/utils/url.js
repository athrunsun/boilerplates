import * as commonUtils from '@/utils/common';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseUrl The base URL
 * @param {string} relativeUrl The relative URL
 * @returns {string} The combined URL
 */
function combineUrl(baseUrl, relativeUrl) {
    return relativeUrl ? baseUrl.replace(/\/+$/, '') + '/' + relativeUrl.replace(/^\/+/, '') : baseUrl;
}

/**
 * @param {string} baseUrl
 * @param {string[]} relativeUrls
 */
function combineMultipleUrls(baseUrl, relativeUrls) {
    return relativeUrls.reduce((accumulator, currentValue) => combineUrl(accumulator, currentValue), baseUrl);
}

/**
 * @param {string} url
 * @param {{ [key: string]: string | number }} pathParameters
 */
function processPathParameters(url, pathParameters) {
    for (const pathParamKey of Object.keys(pathParameters)) {
        const re = new RegExp(`:${pathParamKey}`);
        url = url.replace(re, pathParameters[pathParamKey].toString());
    }

    return url;
}

/**
 * @param {string} url
 * @param {{ [key: string]: string | number }} pathParameters
 */
function processQueryParameters(url, queryParameters) {
    const query = [];

    for (const [key, value] of Object.entries(queryParameters)) {
        query.push(`${key}=${encodeURIComponent(value)}`);
    }

    url = `${url}?${query.join('&')}`;
    return url;
}

/**
 * @param {string} serverAddress
 * @param {string | string[]} urlPaths
 * @param {{ [key: string]: string | number }} pathParameters
 * @param {{ [key: string]: string | number }} queryParameters
 */
function createUrl(serverAddress, urlPaths, pathParameters = {}, queryParameters = {}) {
    let url = combineMultipleUrls(serverAddress, commonUtils.isArray(urlPaths) ? urlPaths : [urlPaths]);

    if (!commonUtils.isEmpty(pathParameters)) {
        url = processPathParameters(url, pathParameters);
    }

    if (!commonUtils.isEmpty(queryParameters)) {
        url = processQueryParameters(url, queryParameters);
    }

    return url;
}

/**
 * @param {string} serverAddress
 * @param {string | string[]} urlPaths
 * @param {{ [key: string]: string | number }} pathParameters
 * @param {{ [key: string]: string | number }} queryParameters
 */
function createUrlWithServerAddress(serverAddress, urlPaths, pathParameters = {}, queryParameters = {}) {
    return createUrl(serverAddress, urlPaths, pathParameters, queryParameters);
}

/**
 * @param {string | string[]} urlPaths
 * @param {{ [key: string]: string | number }} pathParameters
 * @param {{ [key: string]: string | number }} queryParameters
 */
function createUrlWithoutServerAddress(urlPaths, pathParameters = {}, queryParameters = {}) {
    return createUrl('', urlPaths, pathParameters, queryParameters);
}

export { createUrl, createUrlWithServerAddress, createUrlWithoutServerAddress };
