module.exports = {
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testURL: 'http://localhost',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/__tests__/$1',
    },
};
