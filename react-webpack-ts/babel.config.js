module.exports = api => {
    // https://babeljs.io/docs/en/next/config-files#apicache
    api.cache.using(() => process.env.NODE_ENV === 'development');

    return {
        presets: [[require.resolve('@babel/preset-react'), { development: process.env.NODE_ENV === 'development' }]],
    };
};
