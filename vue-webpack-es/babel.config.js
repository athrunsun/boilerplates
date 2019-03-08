module.exports = api => {
    // https://babeljs.io/docs/en/next/config-files#apicache
    api.cache.using(() => process.env.NODE_ENV === 'development');

    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                alias: {
                    '@app': './src',
                    '@eng': './eng',
                },
            },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-regenerator',
        // https://github.com/babel/babel-loader#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
        '@babel/plugin-transform-runtime',
    ];

    return {
        presets: ['@babel/preset-env'],
        plugins,
    };
};
