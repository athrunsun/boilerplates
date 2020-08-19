const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.production.config');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
    if (err) {
        console.error(err);
    }

    console.log('Prod build completed.');
});
