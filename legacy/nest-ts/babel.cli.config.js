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
                    '@app': PATHS.BUILD_OUTPUT_DIR,
                    '@eng': './eng',
                    '@test': './test',
                },
            },
        ],
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
