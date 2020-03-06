'use strict';

// Use following (assumes `eslint-plugin-privilegs` is in sibling directory):
/*
$(npm bin)/eslint --no-eslintrc --no-inline-config --ignore-path="../eslint-plugin-privileges/privileged-ignore.txt" --config="../eslint-plugin-privileges/.eslintrc-privilege-check.js" .
*/

// INCOMPLETE!!!!

// Todo: Allow parsing so that `return` can be parsed when used in CLI scripts

module.exports = {
  rules: {
      // Todo: Check for any config
    'no-eval': 2
  },
  // Need this `parser` (see discussion above `globalReturn` below)
  parser: 'babel-eslint',
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

      // However, it turns out we can enable when using `babel-eslint`,
      //  which may have the additional advantage of being more lenient for
      //  some other syntaxes that might not yet be supported.
      globalReturn: true
    }
  }
};
