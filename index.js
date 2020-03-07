const {parseForESLint} = require('babel-eslint');

/*
const defaultKeys = require('eslint-visitor-keys');
console.log('defaultKeys', defaultKeys);
*/

// Todo: Aggregate results into a file `Map`, and then perform linting (or
//  if doing along the way, only perform linting once per discovered file).
//  But ensure the traversal code is separated so we can have a useful
//  generic traverser by import/require.

// Todo: can probably just use esquery instead for traversal?

// Note: if looking also for what is *exported*, e.g., to know what
//   globals are, if non-module mode in browser, should look at `var` and
//   even `const`/`let`; can then use, e.g., for `jsdoc/no-undefined-types`;
//   as with `no-unrestricted-properties`, etc., we want to find out when
//   `window` or other globals are used, but to collect the uses, rather than
//   report them.

// Could have generic API for whether to traverse through ESM, CJS (and
//  HTML script tags?), with either a callback or esquer(ies) for how
//  to collect the data of interest on each page, then return that result
//  with file name/path (and module type used, e.g., if multiple module types
//  are being queried). For linting, we could just get files and then
//  use `eslint-plugin-query` with the selectors there instead.

// Could propose this traversal mechanism as a command line option for
//  eslint itself, esp. if get as a working demo (in place of, or in addition to,
//  a set of whitelisted files). Could also have an option to give
//  an error or report listing files which were not traversed but
//  within a set of specified files. Could also have a blacklist so that
//  not end up linting, e.g., `node_modules` (e.g., when linting
//  non-security issues)

// Decided againts @babel/traverse, in case might use ESLint AST
//  for ESLint rules
const Traverser = require('eslint/lib/shared/traverser.js');

const result = parseForESLint(`
  import './abc.js';
  require('abc');
`);

// console.log('result', result.ast);

Traverser.traverse(result.ast, {
  enter (node /* , parent */) {
    console.log('node', node.type);
    switch (node.type) {
    case 'ImportDeclaration':
      console.log('import declaration', node);
      break;
    }
  }
  // visitorKeys: []
  // leave (node, parent)
}, {});
