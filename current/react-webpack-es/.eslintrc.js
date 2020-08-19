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
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
    },
    plugins: ['babel', 'prettier', 'react-hooks'],
    settings: {
        'import/resolver': {
            'babel-module': {
                alias: {
                    '@': './src',
                    '@eng': './eng',
                    '@test': './__tests__',
                },
            },
        },
    },
    rules: {
        indent: 'off', // Incompatible with prettier
        'prettier/prettier': ['error'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
