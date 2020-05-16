/* eslint @typescript-eslint/no-var-requires: "off" */
const PATHS = require('./eng/paths');

module.exports = api => {
    api.cache.forever();

    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                alias: {
                    '@app':
                        process.env.NODE_ENV === 'development'
                            ? PATHS.DEV_TS_BUILD_OUTPUT_DIR
                            : PATHS.PROD_TS_BUILD_OUTPUT_DIR,
                    '@eng': './eng',
                    '@test': './test',
                },
            },
        ],
        require.resolve('@babel/plugin-proposal-class-properties'),
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
        ],
        plugins,
    };
};
