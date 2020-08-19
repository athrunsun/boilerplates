// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

function isArray(input) {
    return Array.isArray(input);
}

function isEmpty(input) {
    return [Object, Array].includes((input || {}).constructor) && !Object.entries(input || {}).length;
}

export { isArray, isEmpty };
