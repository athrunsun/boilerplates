module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV === 'development');

    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                alias: {
                    '@app': './src',
                    '@eng': './eng',
                    '@test': './test',
                },
            },
        ],
        require.resolve('babel-plugin-transform-typescript-metadata'),
        // https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators.html#note-compatibility-with-babel-plugin-proposal-class-properties
        // @babel/plugin-proposal-decorators must comes before @babel/plugin-proposal-class-properties.
        // https://github.com/nestjs/nest-cli/issues/270#issuecomment-483149847
        // nestjs is compatible only with the legacy option for now.
        [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
        [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
        require.resolve('@babel/plugin-syntax-dynamic-import'),
    ];

    return {
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    targets: { node: 'current' },
                    modules: 'commonjs',
                    ignoreBrowserslistConfig: true,
                },
            ],
            require.resolve('@babel/preset-typescript'),
        ],
        plugins,
    };
};
