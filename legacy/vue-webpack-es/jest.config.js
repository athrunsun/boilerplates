module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/__tests__/$1',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    testURL: 'http://localhost/',
};
