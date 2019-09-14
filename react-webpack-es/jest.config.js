module.exports = {
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    testURL: 'http://localhost',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/__tests__/$1',
    },
};
