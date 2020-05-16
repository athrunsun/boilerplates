import shell from 'shelljs';
import fsExtra from 'fs-extra';
import globby from 'globby';
import path from 'path';

import { PATHS } from '@eng/paths';

function cleanAll() {
    shell.rm('-rf', PATHS.appBuildOutput);
}

/**
 * This is necessary because in watch mode, webpack is caching old build files if they have the same hash and won't emit
 * them again in future builds - nuking the entire `PATHS.appBuildOutput` folder will also delete needed files.
 */
async function clean() {
    const manifestPath = path.resolve(PATHS.appBuildOutput, PATHS.manifestFileName);

    const manifest: { [key: string]: string } = fsExtra.existsSync(manifestPath)
        ? (fsExtra.readJsonSync(manifestPath) as { [key: string]: string })
        : {};

    const outputModules = new Set(await globby('*.+(js|mjs|map)', { cwd: PATHS.appBuildOutput }));

    // Remove files from the `outputModules` set if they're in the manifest.
    for (const fileName of Object.values(manifest)) {
        if (outputModules.has(fileName)) {
            outputModules.delete(fileName);
        }
    }

    // Delete all remaining modules (not in the manifest).
    for (const fileName of outputModules) {
        fsExtra.removeSync(path.join(PATHS.appBuildOutput, fileName));
    }
}

export { cleanAll, clean };
