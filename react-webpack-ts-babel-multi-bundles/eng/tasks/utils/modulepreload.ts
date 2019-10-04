import fsExtra from 'fs-extra';
import path from 'path';

import { PATHS } from '@eng/paths';

let modulepreloadMap: object;

const getModulepreload = () => {
    if (!modulepreloadMap) {
        const modulepreloadPath = path.resolve(PATHS.appBuildOutput, PATHS.modulepreloadFileName);
        modulepreloadMap = fsExtra.readJsonSync(modulepreloadPath, { throws: false }) || {};
    }

    return modulepreloadMap;
};

const saveModulepreload = () => {
    fsExtra.outputJson(path.resolve(PATHS.appBuildOutput, PATHS.modulepreloadFileName), modulepreloadMap, {
        spaces: 4,
    });
};

const resetModulepreload = () => {
    modulepreloadMap = {};
    saveModulepreload();
};

const getModule = (filename: string) => {
    getModulepreload();

    if (!modulepreloadMap[filename]) {
        throw new Error(`Revisioned file for '${filename}' doesn't exist`);
    }

    return modulepreloadMap[filename];
};

const addModule = async (filename: string, revisionedFilename: string) => {
    getModulepreload();
    modulepreloadMap[filename] = revisionedFilename;
    saveModulepreload();
};

const getRevisionedModuleUrl = (filename: string) => {
    return path.resolve(PATHS.appBuildOutput, getModule(filename));
};

export { getModulepreload, saveModulepreload, resetModulepreload, getModule, addModule, getRevisionedModuleUrl };
