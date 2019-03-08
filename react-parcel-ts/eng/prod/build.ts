import * as debug from 'debug';
import * as ParcelBundler from 'parcel-bundler';

import PATHS from '@eng/paths';

const logger = debug('eng:prod:build');

(async () => {
    const bundler = new ParcelBundler(PATHS.appIndexHtml);
    await bundler.bundle();
})();
