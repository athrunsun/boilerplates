module.exports = {
    testRegex: '\\.e2e-spec\\.ts$',
    rootDir: '..',
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/test/$1',
    },
    testEnvironment: 'node',
};
