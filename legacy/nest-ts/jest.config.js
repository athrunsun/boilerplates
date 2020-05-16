module.exports = {
    testRegex: '\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    rootDir: '.',
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/test/$1',
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: ['**/*.ts'],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/test/'],
    testEnvironment: 'node',
};
