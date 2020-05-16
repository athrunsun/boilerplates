module.exports = {
    root: true,
    globals: {
        preval: false,
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/prettier'],
    // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 7,
        sourceType: 'module',
    },
    plugins: ['babel', 'prettier'],
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
        indent: 'off', // Incompatible with prettier
        'prettier/prettier': ['error'],
        'vue/v-bind-style': ['off'],
    },
};
