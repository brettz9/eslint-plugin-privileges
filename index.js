const {parseForESLint} = require('babel-eslint');

/*
const defaultKeys = require('eslint-visitor-keys');
console.log('defaultKeys', defaultKeys);
*/

// Todo: Should probably just use esquery instead

// Decided againts @babel/traverse, in case might use ESLint AST
//  for ESLint rules
const Traverser = require('eslint/lib/shared/traverser.js')

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
