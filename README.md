# eslint-plugin-privileges

Rules for reporting excessive privileges or otherwise unwanted practices.

Especially aimed for linting third-party dependencies. It is not expected
to be usable for completely untrusted code for the indefinite future,
however, though that is an eventual goal. Its utility now should be in
checking for, and alerting dependency authors, for intrusive practices.

**This project is not yet functional**

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-privileges`:

```
$ npm install eslint-plugin-privileges --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then
you must also install `eslint-plugin-privileges` globally.

## Usage

Add `privileges` to the plugins section of your `.eslintrc.*` configuration
file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "privileges"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "privileges/<TODO>": 2
    }
}
```

Or if you want the rules above, you can just use:

```json
{
    "extends": [
        "plugin:privileges/privileges"
    ]
}
```

If you want the rules above, along with these recommended rules
(external to this library):

```json
{
    "rules": {
        "no-eval": ["error"],
        "no-extend-native": ["error"]
    }
}
```

...you can use:

```json
{
    "extends": [
        "plugin:privileges/recommended"
    ]
}
```

Note that almost any rule may have its legitimate use cases.

## Supported Rules

- Fill in provided rules here

## To-dos

1. Prevent Node modules and globals
    1. Use `eslint-plugin-import` with
        [`no-nodejs-modules`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md)
        along with sensible defaults for restricting built-in Node modules (e.g.,
        allowing `path` but requiring whitelisting for `fs`) and possibly other
        `eslint-plugin-import` rules.
    1. Prevent modifying `process.argv`
1. Prevent browser and user globals (with conveniences for enabling DOM portions)
    1. Ensure detection of access (overwriting, setting properties, or even reading,
        depending on options) to `global`, `globalThis`, `window`, `self`, `parent`,
        `top`, etc. is restricted, whether of static or dynamic properties. Note also
        such as `window.window`.
    1. Aggregate [`globals`](https://www.npmjs.com/package/globals) items into higher
        order groups, e.g., "dom" so that `document`, `HTMLElement`, etc. would be
        allowed by a single item (not including `window`) but not including other items
        which may technically be accessible through the DOM `window`, but which are
        not thought of as such (e.g., `PaymentRequest` or `indexedDB`).
1. Follow or prevent injection of script tags (or dynamic tags?)
1. Deal with problem of concatenated properties (e.g.,
    `document['create' + 'Element']`); need to prevent dynamic access
    on `document` as well as `window`.
1. General checks into important practices of dependencies
    1. See Home config begun at <https://gist.github.com/brettz9/d473b8435e97abc5a4fae61f12e095bb>.
    1. One can opt back in by adding this to ignore `!node_modules/**`
        `$(npm bin)/eslint --no-inline-config --no-eslintrc --ignore-pattern='!node_modules/**' --ignore-pattern='!*.js' --config=".eslintrc.js" --no-ignore .`
        or with own ignore file:
        `$(npm bin)/eslint --no-inline-config --no-eslintrc --config=".eslintrc.js" .`
        1. Should ensure no other extensions are used (where they can be)!
    - `no-prototype-builtins`: though more self-risk related, rather than polluting,
        can be a hole like `no-eval`
    - Rules for checking ES6 templates and string concat to `res.end()` or what not?
        But need to track that string had a user variable
    - `no-global-assign` - very good but too aggressive, as shouldn't complain
        about user's own defining of globals as much as about overwriting native
        (though users may be concerned about globals too); use a version of
        `no-shadow` instead (since aware of globals)?
    - `'no-redeclare': ['error', { builtinGlobals: true }]` would be good if without
        the rule against redeclaring own variables (unless, as with `no-global-assign`,
        concerned about globals)
    - [no-restricted-globals](https://eslint.org/docs/rules/no-restricted-globals)
    - [no-restricted-properties](https://eslint.org/docs/rules/no-restricted-properties)
      1. Get `no-restricted-properties` to work with nested properties (e.g., with a dot, such as `window.window` or `window['window']` so couldn't access `window.window.bad`)? Make special rule against `window.window` or permutations like `top.window`?
      2. Request option to add **whitelist within `no-restricted-properties`**, so can
          permit certain properties on object otherwise blanket blacklisted.
      3. Would need to track or forbid assignments/usage, e.g., so that
            `var w = window; w.window.bad` couldn't work; also would be
            useful for `eslint-plugin-unsanitized` in tracking
            elements, e.g., `document.body['inner' + 'HTML']` or ``elem[`${"innerHTML"}`]``.
      4. Could have option to allow polyfills (whereby would only set the
          variable if the same variable were confirmed as `undefined`
          in the parent `if`), and/or allow user or built-in polyfills.
          1. Could limit to whitelisted polyfills (and for a whitelisted
              file only) so a polyfill one was deliberately using would
              nevertheless not be permitted to set other globals.
              (Could use `overrides`, but might be easier as this really
              calls out for having an option to restrict to a certain
              single file only.)
    - [no-restricted-imports](https://eslint.org/docs/rules/no-restricted-imports) (or equivalents in `eslint-plugin-import`?)
    - [no-restricted-modules](https://eslint.org/docs/rules/no-restricted-modules) (or equivalents in `eslint-plugin-import`?)
    - https://github.com/mozilla/eslint-plugin-no-unsanitized
    - Ensure passing:
        - `--no-inline-config`
        - `--no-eslintrc`
        - When linting all one's repos, e.g., in a Home directory, ensure one has `--ignore-pattern="Desktop/**"` or own ignore file!
        - If child ignores apply (doesn't appear they do), should also add
            `--no-ignore` (note that `--no-eslintrc` does not appear to reject
            `--config` per CLI doc page).
    - Disallow [`--exported`](https://eslint.org/docs/rules/no-unused-vars#exported) from [--no-inline-config](https://eslint.org/docs/user-guide/command-line-interface#inline-configuration-comments) if not already (or change `no-undef`) if `var window` would cause the item to be ignored? ; note: can use `no-restricted-globals` to blacklist window, etc. Filed <https://github.com/eslint/eslint/issues/13013>. Not of great security consequence though as `no-unused-vars` is not as much of a security concern.
1. In the npm ecosystem, are there any other loopholes here (besides
    `install`/`postinstall` scripts which could add/build JavaScript in
    a way harmful to the system)? (Besides blocking with
    `npm install --no-scripts`) Propose a `trustedDependencies` which
    installs versions without build steps, to give security assurances
    (as long as a missing file would not be searched in a higher directory)?
    Could even have linting to check that no such scripts are even present?
    Might unbuilt source require files which, when missing in the source,
    might be searched higher up mistakenly getting access to the trusted
    version? See <https://nodejs.org/api/modules.html#modules_all_together>
    (what is `exports` in `package.json`?).
1. Need a new rule like `no-global-vars` so that non-module, browser files cannot
    set globals with `var` (or `const` or `let` which also act as globals in such
    environments). Might just use:
    [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax)
    with `Program > VariableDeclaration` and only applied where the environment
    was known not to be Node or an ESM module. As eslint has no auto-detection of
    environment (e.g., such that `overrides` could use `env` as an input rather
    than result), we could try setting as
    `Program > VariableDeclaration:not(ImportDeclaration ~ VariableDeclaration)`
    to exclude when `ImportDeclaration` was a (preceding) sibling, since that
    would either be unusable if not ESM, or if ESM, variable declarations would
    be safe. But it seems it would be effectively impossible to reliably detect
    a file was a Node-only file (checking for `require` calls or `module.exports`
    and `exports` setting wouldn't be safe, and tracing through HTML script
    tags to ensure a file wasn't used within HTML would be difficult to say
    the least).
    1. Would need to exclude other declarations like `FunctionDeclaration`
        and `ClassDeclaration`.
    1. One challenge would be in adapting the selector to whitelist variable
        names (e.g., to allow `a` and `b`, would be:
        `VariableDeclaration > .declarations[type="VariableDeclarator"][id.name="a"],
         VariableDeclaration > .declarations[type="VariableDeclarator"][id.name="b"]`).
    1. Filed <https://github.com/eslint/eslint/issues/13028> to hopefully
        simplify this.
    1. `no-implicit-globals` with `lexicalBindings: true` mostly covers this,
        but has no whitelist option; filed <https://github.com/eslint/eslint/issues/13033>.
1. While this focuses on intrusiveness, there is also a need for linting
    others' code for likely bugs (beyond just stylistic issues)
1. Secondary concerns
    1. Means of iteration
        1. See [`es-file-traverse`](https://github.com/brettz9/es-file-traverse)
            1. Once project may be functional, document applicability of
                `es-file-traverse` and supply it with a security-related
                `ruleMap`.
    1. Means of advertising privilege use
        1. Add a badge-maker to advertise those privileges required/in use in
            one's project (use [`eslint-formatter-badger`](https://github.com/brettz9/eslint-formatter-badger))
            1. Create rule map to go with config (for security rules)
    1. Linting (ESLint?) tool to check (and make badge reports for) whether
        dependency scripts have install/postinstall scripts (so known if
        will break things to use `--no-scripts`)
    1. Could also have linting tool to insist that all deps/devDeps were
        pegged to exact version.
1. Probably will want to use eslint formatters that are source-map aware:
    1. <https://www.npmjs.com/package/eslint-stylish-mapped>
    1. <https://www.npmjs.com/package/eslint-path-formatter>
1. Integrate:
    1. <https://github.com/HKalbasi/eslint-plugin-toplevel>
    1. <https://github.com/Rantanen/eslint-plugin-xss>
    1. <https://github.com/nodesecurity/eslint-plugin-security>
    1. <https://github.com/nickdeis/eslint-plugin-no-secrets>
    1. <https://github.com/mozfreddyb/eslint-config-scanjs> (with <https://github.com/mozfreddyb/eslint-plugin-scanjs-rules>)
1. Would be helpful to be able to allow in `overrides` specification that
    a rule should only be overridden a certain number of times (e.g.,
    one may know that `eval` must be used once in a file, but to
    be informed of need to reevaluate amount if a dependency adds another).
1. Make more subconfigs, e.g., for preventing globals
