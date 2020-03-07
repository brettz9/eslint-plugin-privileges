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
