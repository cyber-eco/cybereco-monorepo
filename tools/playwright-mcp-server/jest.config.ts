export default {
  displayName: 'playwright-mcp-server',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/tools/playwright-mcp-server',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};