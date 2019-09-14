import debug from 'debug';
import webpack, { Stats } from 'webpack';

import webpackConfig from '@eng/webpack/webpack.production.config';

const logger = debug('eng:prod:build');

const compiler = webpack(webpackConfig);

compiler.run((err: any, stats: Stats) => {
    if (err) {
        logger(err);
    }

    logger('Prod build completed.');
});
