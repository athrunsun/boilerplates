module.exports = {
    presets: [
        require.resolve('@babel/preset-env'),
        [require.resolve('@babel/preset-react'), { development: process.env.NODE_ENV === 'development' }],
    ],
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
        require.resolve('@babel/plugin-proposal-class-properties'),
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-transform-regenerator'),
        require.resolve('@babel/plugin-transform-runtime'),
    ],
};
