# eslint-plugin-privileges

**This project is not complete**

This is currently just a placeholder for some doodles and considerations on
using ESLint for detecting privileges (add a badge-maker to list
privileges in use).

## To-dos

1. Prevent Node globals
    1. Use `eslint-plugin-import` with
        [`no-nodejs-modules`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md)
        along with sensible defaults for restricting built-in Node modules (e.g.,
        allowing `path` but requiring whitelisting for `fs`) and possibly other
        `eslint-plugin-import` rules.
1. Prevent browser and user globals (with conveniences for enabling DOM portions)
    1. Ensure detection of access (overwriting, setting properties, or even reading,
        depending on options) to `global`, `globalThis`, `window`, `self`, `parent`,
        `top`, etc. is restricted, whether of static or dynamic properties. Note also
        such as `window.window`.
    1. Aggregate [`globals`](https://www.npmjs.com/package/globals) items into higher
        order groups, e.g., "dom" so that `document`, `HTMLElement`, etc. would be
        allowed by a single item (not including `window`) but not including other items
        which may technically be accessible through the DOM `window`, but which are`
        not thought of as such (e.g., `PaymentRequest` or `indexedDB`).
1. General checks into important practices of dependencies
    1. See Home config begun at <https://gist.github.com/brettz9/d473b8435e97abc5a4fae61f12e095bb>.
    1. One can opt back in by adding this to ignore `!node_modules/**`
        `$(npm bin)/eslint --no-inline-config --no-eslintrc --ignore-pattern='!node_modules/**' --ignore-pattern='!*.js' --config=".eslintrc.js" --no-ignore .`
        or with own ignore file:
        `$(npm bin)/eslint --no-inline-config --no-eslintrc --config=".eslintrc.js" .`
        1. Should ensure no other extensions are used (where they can be)!
    - `no-eval`
    - `no-extend-native`
    - Rules for checking ES6 templates and string concat to `res.end()` or what not?
        But need to track that string had a user variable
    - `no-global-assign`
    - [no-restricted-globals](https://eslint.org/docs/rules/no-restricted-globals)
    - [no-restricted-properties](https://eslint.org/docs/rules/no-restricted-properties)
      1. Get `no-restricted-properties` to work with nested properties (e.g., with a dot, such as `window.window` or `window['window']` so couldn't access `window.window.bad`)? Make special rule against `window.window` or permutations like `top.window`?
      2. Request option to add **whitelist within `no-restricted-properties`**, so can
          permit certain properties on object otherwise blanket blacklisted.
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
1. In the npm ecosystem, are there any other loopholes here (besides `install`/`postinstall` scripts which could add/build JavaScript in a way harmful to the system)? (Besides blocking with `npm install --no-scripts`) Propose a `trustedDependencies` which installs versions without build steps, to give security assurances (as long as a missing file would not be searched in a higher directory)?
Might unbuilt source require files which, when missing in the source, might be searched higher up mistakenly getting access to the trusted version? See <https://nodejs.org/api/modules.html#modules_all_together> (what is `exports` in `package.json`?).
1. Need a new rule like `no-global-vars` so that non-module, browser files cannot
    set globals with `var` (or `const` or `let` which also act as globals in such
    environments).

1. Secondary concerns
    1. Means of iteration
        1. See [`es-file-traverse`](https://github.com/brettz9/es-file-traverse)
    1. Means of advertising privilege use
        1. Add a badge-maker to advertise those privileges required/in use in
            one's project
    1. Linting (ESLint?) tool to check (and make badge reports for) whether
        dependency scripts have install/postinstall scripts (so known if
        will break things to use `--no-scripts`)
    1. Could also have linting tool to insist that all deps/devDeps were
        pegged to exact version.
1. Integrate:
    1. <https://github.com/HKalbasi/eslint-plugin-toplevel>
    1. <https://github.com/Rantanen/eslint-plugin-xss>
    1. <https://github.com/nodesecurity/eslint-plugin-security>
    1. <https://github.com/nickdeis/eslint-plugin-no-secrets>
