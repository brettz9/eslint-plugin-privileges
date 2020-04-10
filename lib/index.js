/**
 * @fileoverview Rules for reporting excessive privileges or otherwise unwanted practices
 * @author Brett Zamir
 */
'use strict';

// Todo: Export config, or any custom rules, etc.


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

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
      'no-eval': ['error']
    }
  }
};

// Todo: Use for processing HTML script tags?

// import processors
module.exports.processors = {

    // add your processors here
};
