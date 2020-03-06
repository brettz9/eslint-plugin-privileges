'use strict';

// INCOMPLETE!!!!

// Todo: Allow parsing so that `return` can be parsed when used in CLI scripts

module.exports = {
  rules: {
      // Todo: Check for any config
    'no-eval': 2
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      // Unfortunately, per https://github.com/eslint/eslint/issues/8767 ,
      //  this won't be lenient so as to work with either modules
      //  or CLI scripts, so we can't enable this to prevent the parsing errors
      //  for CLI scripts AND keep `sourceType: "module"` (even with `env` of
      //  `node` and/or `commonjs`: `true`) (those would have to be checked
      //  separately and the CLI parsing errors filtered out from the other view).
      // Could use overrides perhaps to change, but one would need to
      //   manage for each repo or file
      // globalReturn: true
    }
  }
};
