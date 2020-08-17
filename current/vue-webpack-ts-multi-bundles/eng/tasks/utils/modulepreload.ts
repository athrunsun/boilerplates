import fsExtra from 'fs-extra';
import path from 'path';

import { PATHS } from '@eng/paths';

let modulepreloadMap: object;

function getModulepreload() {
    if (!modulepreloadMap) {
        const modulepreloadPath = path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.MODULE_PRELOAD_FILE_NAME);
        modulepreloadMap = fsExtra.readJsonSync(modulepreloadPath, { throws: false }) || {};
    }

    return modulepreloadMap;
}

function saveModulepreload() {
    fsExtra.outputJson(path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.MODULE_PRELOAD_FILE_NAME), modulepreloadMap, {
        spaces: 4,
    });
}

function resetModulepreload() {
    modulepreloadMap = {};
    saveModulepreload();
}

function getModule(filename: string) {
    getModulepreload();

    if (!modulepreloadMap[filename]) {
        throw new Error(`Revisioned file for '${filename}' doesn't exist`);
    }

    return modulepreloadMap[filename];
}

function addModule(filename: string, revisionedFilename: string) {
    getModulepreload();
    modulepreloadMap[filename] = revisionedFilename;
    saveModulepreload();
}

function getRevisionedModuleUrl(filename: string) {
    return path.resolve(PATHS.APP_BUILD_OUTPUT, getModule(filename));
}

export { getModulepreload, saveModulepreload, resetModulepreload, getModule, addModule, getRevisionedModuleUrl };
