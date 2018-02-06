module.exports = {
  parser: 'babel-eslint',
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      ecmaVersion: 7,
      sourceType: 'module',
      ecmaFeatures: { 'classes': true },
    },
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 'tab'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['warn', { allow: ['info', 'error'] }],
    'arrow-parens': ['error', 'always'],
  },
};
