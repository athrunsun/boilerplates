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
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-transform-regenerator'),
        // https://github.com/babel/babel-loader#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
        require.resolve('@babel/plugin-transform-runtime'),
    ];

    return {
        presets: [
            require.resolve('@babel/preset-env'),
            require.resolve('@babel/preset-typescript'),
            [require.resolve('@babel/preset-react'), { development: process.env.NODE_ENV === 'development' }],
        ],
        plugins,
    };
};
