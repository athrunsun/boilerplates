module.exports = {
    // So parent files don't get applied
    root: true,
    globals: {
        preval: false,
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
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
    },
};
