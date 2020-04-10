'use strict';
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['ash-nazg/sauron-node', 'plugin:node/recommended-script'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'import/no-commonjs': 0
  }
};
