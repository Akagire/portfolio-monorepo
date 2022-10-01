module.exports = {
  root: true,
  extends: ['@portfolio/eslint-config', 'next/core-web-vitals', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint']
};