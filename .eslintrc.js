'use strict';
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: false
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
  }
};
