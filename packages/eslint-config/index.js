module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'quote-props': ['error', 'as-needed'],
  },
};
