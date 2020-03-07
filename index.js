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
