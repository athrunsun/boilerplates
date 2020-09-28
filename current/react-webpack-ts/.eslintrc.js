module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
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
        react: {
            version: 'detect',
        },
    },
    rules: {
        indent: 'off', // Incompatible with prettier
        'no-unused-vars': 'warn',
        'prettier/prettier': 'warn',
        'react/display-name': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            env: {
                es6: true,
                browser: true,
                node: true,
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:prettier/recommended',
                'prettier/@typescript-eslint',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
            },
            plugins: ['prettier', 'react-hooks'],
            settings: {
                react: {
                    version: 'detect',
                },
            },
            rules: {
                'no-unused-vars': 'warn',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/camelcase': 'off',
                'react/display-name': 'off',
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
                'prettier/prettier': 'warn',
            },
        },
    ],
};
