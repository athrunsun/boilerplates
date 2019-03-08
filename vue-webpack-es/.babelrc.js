module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
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
        '@babel/plugin-transform-runtime',
    ],
};
