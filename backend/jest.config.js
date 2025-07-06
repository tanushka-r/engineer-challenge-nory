const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/test/unit/**/*.test.ts',        // unit tests
    '**/test/integration/**/*.test.ts' // integration tests
  ],
  moduleFileExtensions: ['ts', 'js'],
  rootDir: './',
};
