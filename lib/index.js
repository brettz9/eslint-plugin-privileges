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
const privileges = {};

module.exports.configs = {
  privileges: {
    ...privileges
  },
  recommended: {
    plugins: ['privileges'],
    rules: {
      ...privileges,
      // Though ok if very well-filtered or used in trusted contexts
      'no-eval': ['error'],
      // Though ok for polyfills
      'no-extend-native': ['error']
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
