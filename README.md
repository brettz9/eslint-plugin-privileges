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
    Note that eslint limitations apparently prevent `node_modules` checking atm.

1. Secondary concerns
    1. Means of iteration
        1. Iterate through files for `require`, `import` (dynamic or static), and maybe
            `define` (`fetch` or `XMLHttpRequest` could be used with `eval` but that
            rule could not be readily used without a lot of complexity). Ensure can
            check any extension found for an imported/required file, not
            just those at command line. Use <https://www.npmjs.com/package/resolve>
            to find the next file (for `env: "node"`)
    1. Means of advertising privilege use
        1. Add a badge-maker to advertise those privileges required/in use in
            one's project
