module.exports = {
  extends: ['../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tools/playwright-mcp-server/tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};