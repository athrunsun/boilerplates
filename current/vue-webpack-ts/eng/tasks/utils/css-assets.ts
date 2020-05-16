import fsExtra from 'fs-extra';
import path from 'path';

import { PATHS } from '@eng/paths';

let revisionedCssAssetManifest: object;

function getManifest() {
    if (!revisionedCssAssetManifest) {
        const manifestPath = path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.CSS_ASSETS_FILE_NAME);
        revisionedCssAssetManifest = fsExtra.readJsonSync(manifestPath, { throws: false }) || {};
    }

    return revisionedCssAssetManifest;
}

function saveManifest() {
    fsExtra.outputJsonSync(
        path.resolve(PATHS.APP_BUILD_OUTPUT, PATHS.CSS_ASSETS_FILE_NAME),
        revisionedCssAssetManifest,
        {
            spaces: 4,
        },
    );
}

function resetManifest() {
    revisionedCssAssetManifest = {};
    saveManifest();
}

function getCssAsset(filename: string) {
    getManifest();

    if (!revisionedCssAssetManifest[filename]) {
        throw new Error(`Revisioned file for '${filename}' doesn't exist`);
    }

    return revisionedCssAssetManifest[filename];
}

function addCssAsset(filename: string, revisionedFilename: string) {
    getManifest();
    revisionedCssAssetManifest[filename] = revisionedFilename;
    saveManifest();
}

function getRevisionedCssAssetUrl(filename: string) {
    return path.resolve(PATHS.APP_BUILD_OUTPUT, getCssAsset(filename));
}

export { getManifest, saveManifest, resetManifest, getCssAsset, addCssAsset, getRevisionedCssAssetUrl };
