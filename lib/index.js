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

const ruleCategories = {
  // These rules are to protect from well-meaning projects being exploited
  easyHoles: {
    'no-prototype-builtins': ['error'],
    // Though ok if very well-filtered or used in trusted contexts
    'no-eval': ['error']
  },

  // These rules are to protect from unintended intrusions into other code,
  //   such as globals
  intrusive: {
    // Though ok for polyfills
    'no-extend-native': ['error']
  }
};

const configs = {
  privileges: {
    plugins: ['privileges'],
    rules: projectRules
  },
  recommended: {
    plugins: ['privileges'],
    rules: {
      ...projectRules,
      ...ruleCategories.easyHoles,
      ...ruleCategories.intrusive
    }
  }
};
['easyHoles', 'intrusive'].forEach((category) => {
  configs[category] = {
    plugins: ['privileges'],
    rules: ruleCategories[category]
  };
});
module.exports.configs = configs;

// Todo: Use for processing HTML script tags?
/*
// import processors
module.exports.processors = {

    // add your processors here
};
*/
