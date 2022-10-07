const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.development.config');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
    if (err) {
        console.error(err);
    }

    console.log('Dev build completed.');
});
