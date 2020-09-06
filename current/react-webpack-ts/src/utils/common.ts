// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

function isArray(input: any): input is any[] {
    return Array.isArray(input);
}

function isEmpty(input: any) {
    return [Object, Array].includes((input || {}).constructor) && !Object.entries(input || {}).length;
}

export { isArray, isEmpty };
