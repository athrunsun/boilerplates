module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV === 'development');

    const isTest = api.env('test');

    const browsers = ['last 2 Chrome versions', 'last 2 Firefox versions'];

    const presetEnvOptionsNode = { targets: { node: 'current' } };
    const presetEnvOptionsBrowser = { modules: false, targets: browsers };

    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                alias: {
                    '@app': './src',
                    '@eng': './eng',
                    '@test': './__tests__',
                },
            },
        ],
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-syntax-dynamic-import'),
    ];

    if (isTest) {
        // Need to transpile `lodash-es`.
        plugins.push(require.resolve('@babel/plugin-transform-modules-commonjs'));
    }

    return {
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    ...(isTest ? presetEnvOptionsNode : presetEnvOptionsBrowser),
                },
            ],
            require.resolve('@babel/preset-typescript'),
            [require.resolve('@babel/preset-react'), { development: process.env.NODE_ENV === 'development' }],
        ],
        plugins,
    };
};
