// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: process.cwd(),

  setupFilesAfterEnv: ['./test-harness/jest.setup.js', './test-harness/bootstrap.js'],

  testMatch: ['<rootDir>/**/tests/**/*.spec.*?(x)'],

  testPathIgnorePatterns: ['<rootDir>/testing-app'],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  transformIgnorePatterns: ['node_modules'],

  setupFiles: [require.resolve('core-js')],

  moduleFileExtensions: ['ts', 'tsx', 'jsx', 'js'],

  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],

  coveragePathIgnorePatterns: ['index.js', 'ThresholdMap.ts'],

  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      function: 100,
      lines: 100,
      statements: 100,
    },
  },

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': require.resolve('./test-harness/preprocessor'),
    '^(?!.*\\.(ts|tsx|js|jsx|css|json)$)': require.resolve('./test-harness/fileTransform'),
  },

  verbose: true,
  testURL: 'http://localhost',

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom-global',
};
