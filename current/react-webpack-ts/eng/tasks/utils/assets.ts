import fsExtra from 'fs-extra';
import path from 'path';

import { PATHS } from '@eng/paths';

let revisionedAssetManifest: object;

function getManifest() {
    if (!revisionedAssetManifest) {
        const manifestPath = path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.MANIFEST_FILE_NAME);
        revisionedAssetManifest = fsExtra.readJsonSync(manifestPath, { throws: false }) || {};
    }

    return revisionedAssetManifest;
}

function saveManifest() {
    fsExtra.outputJsonSync(path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.MANIFEST_FILE_NAME), revisionedAssetManifest, {
        spaces: 4,
    });
}

function resetManifest() {
    revisionedAssetManifest = {};
    saveManifest();
}

function getAsset(filename: string) {
    getManifest();

    if (!revisionedAssetManifest[filename]) {
        throw new Error(`Revisioned file for '${filename}' doesn't exist`);
    }

    return revisionedAssetManifest[filename];
}

function addAsset(filename: string, revisionedFilename: string) {
    getManifest();
    revisionedAssetManifest[filename] = revisionedFilename;
    saveManifest();
}

function getRevisionedAssetUrl(filename: string) {
    return path.resolve(PATHS.APP_BUILD_OUTPUT, getAsset(filename));
}

export { getManifest, saveManifest, resetManifest, getAsset, addAsset, getRevisionedAssetUrl };
