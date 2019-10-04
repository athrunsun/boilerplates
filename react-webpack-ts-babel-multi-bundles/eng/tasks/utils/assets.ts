import fsExtra from 'fs-extra';
import path from 'path';

import { PATHS } from '@eng/paths';

let revisionedAssetManifest: object;

const getManifest = () => {
    if (!revisionedAssetManifest) {
        const manifestPath = path.resolve(PATHS.appBuildOutput, PATHS.manifestFileName);
        revisionedAssetManifest = fsExtra.readJsonSync(manifestPath, { throws: false }) || {};
    }

    return revisionedAssetManifest;
};

const saveManifest = () => {
    fsExtra.outputJson(path.resolve(PATHS.appBuildOutput, PATHS.manifestFileName), revisionedAssetManifest, {
        spaces: 4,
    });
};

const resetManifest = () => {
    revisionedAssetManifest = {};
    saveManifest();
};

const getAsset = (filename: string) => {
    getManifest();

    if (!revisionedAssetManifest[filename]) {
        throw new Error(`Revisioned file for '${filename}' doesn't exist`);
    }

    return revisionedAssetManifest[filename];
};

const addAsset = async (filename: string, revisionedFilename: string) => {
    getManifest();
    revisionedAssetManifest[filename] = revisionedFilename;
    saveManifest();
};

const getRevisionedAssetUrl = (filename: string) => {
    return path.resolve(PATHS.appBuildOutput, getAsset(filename));
};

const saveModulepreload = (modulepreloadMap: object) => {
    fsExtra.outputJson(path.resolve(PATHS.appBuildOutput, PATHS.modulepreloadFileName), modulepreloadMap, {
        spaces: 4,
    });
};

export { getManifest, saveManifest, resetManifest, getAsset, addAsset, getRevisionedAssetUrl, saveModulepreload };
