# eslint-plugin-privileges

**This project is not complete**

This is currently just a placeholder for some doodles and considerations on
using ESLint for detecting privileges (add a badge-maker to list
privileges in use).

## To-dos

1. Use `eslint-plugin-import` with sensible defaults for restricting built-in
    Node modules (e.g., allowing `path` but requiring whitelisting for `fs`).
1. Aggregate [`globals`](https://www.npmjs.com/package/globals) items into higher
    order groups, e.g., "dom" so that `document`, `HTMLElement`, etc. would be
    allowed by a single item (not including `window`) but not including other items
    which may technically be accessible through the DOM `window`, but which are`
    not thought of as such (e.g., `PaymentRequest` or `indexedDB`).
1. Ensure detection of access to `global`, `globalThis`, `window`, `self`, `parent`,
    `top`, etc. is restricted, whether of static or dynamic properties.
1. Add a badge-maker to advertise those privileges required/in use in one's project
