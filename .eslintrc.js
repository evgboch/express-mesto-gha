module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};