module.exports = {
    testRegex: '\\.spec\\.ts$',
    rootDir: '.',
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/test/$1',
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: ['**/*.(t|j)s'],
    testEnvironment: 'node',
};
