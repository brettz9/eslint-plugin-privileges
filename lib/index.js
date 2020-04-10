/**
 * @file Rules for reporting excessive privileges or
 * otherwise unwanted practices
 * @author Brett Zamir
 */
'use strict';

// const requireIndex = require('requireindex');

// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + '/rules');

// Todo: Add any recommended built-in rules
const projectRules = {};

const easyHoles = {
  'no-prototype-builtins': ['error'],
  // Though ok if very well-filtered or used in trusted contexts
  'no-eval': ['error']
};

const intrusive = {
  // Though ok for polyfills
  'no-extend-native': ['error']
};

module.exports.configs = {
  privileges: {
    plugins: ['privileges'],
    rules: projectRules
  },
  recommended: {
    plugins: ['privileges'],
    rules: {
      ...projectRules,
      ...easyHoles,
      ...intrusive
    }
  }
};

// Todo: Use for processing HTML script tags?
/*
// import processors
module.exports.processors = {

    // add your processors here
};
*/
