module.exports = api => {
    // https://babeljs.io/docs/en/next/config-files#apicache
    api.cache.using(() => process.env.NODE_ENV === 'development');

    return {
        presets: ['@babel/preset-react'],
    };
};
