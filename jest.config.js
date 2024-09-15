const { createDefaultPreset } = require('ts-jest');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  ...createDefaultPreset(),
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@commands/(.*)$": "<rootDir>/src/commands/$1",
    "^@framework/(.*)$": "<rootDir>/src/framework/$1",
    "^@container/(.*)$": "<rootDir>/src/framework/Container/$1",
    "^@providers/(.*)$": "<rootDir>/src/framework/Providers/$1",
    "^@router/(.*)$": "<rootDir>/src/framework/Router/$1"
  },
};