import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,

  coverageProvider: 'v8',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  preset: 'ts-jest',

  testMatch: ['**/*.spec.ts'],

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],

  coverageDirectory: 'coverage',

  coverageReporters: ['text-summary', 'lcov'],
};
