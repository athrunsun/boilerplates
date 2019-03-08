import * as debug from 'debug';
import * as webpack from 'webpack';

import webpackConfig from '@eng/webpack/webpack.production.config';

const logger = debug('eng:prod:build');

const compiler = webpack(webpackConfig);

compiler.run((err: any, stats: any) => {
    if (err) {
        logger(err);
    }

    logger('Prod build completed.');
});
