module.exports = {
    root: true,
    // https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error
    // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/base',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['prettier', 'vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/camelcase': 'off',
    },
};
