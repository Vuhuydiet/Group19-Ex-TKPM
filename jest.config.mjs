/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/frontend/src', '<rootDir>/backend/src'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
