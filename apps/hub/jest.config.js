const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: __dirname,
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (if you have them set up in tsconfig.json)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    // Mock CSS Modules
    '\\.module\\.(css|scss)$': 'identity-obj-proxy',
    // Mock other CSS files
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Mock static file imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  // Add coverage reporting
  collectCoverage: false,
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config
module.exports = createJestConfig(customJestConfig);