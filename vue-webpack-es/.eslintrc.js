module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/prettier'],
    settings: {
        'import/resolver': {
            'babel-module': {
                alias: {
                    '@app': './src',
                    '@eng': './eng',
                },
            },
        },
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/v-bind-style': ['off'],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
