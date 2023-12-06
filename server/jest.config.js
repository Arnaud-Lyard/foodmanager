module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/infrastructure/prisma',
  ],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/prisma/**/*.*'],
};
