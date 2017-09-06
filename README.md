
So you want to:
- Write in Typescript
- Compile for Browser + NodeJS
- Run tests with Karma and Chai

This starter kit does exactly that.

## Customizing

Change the `gulpfile.js` `moduleName` variable to match your
project name. This is the name a default export in `main.ts`
will be available in the browser by.

## Gulp Setup

### Build

Gulp task is called `build`.

1. Clear `dist` and `.tmp` directory.
2. Run Typescript in Gulp using `tsconfig.json` to `.tmp`. Compiled
JS files go into `.tmp/js`, definitions into `.tmp/definitions`.
3. Run `dts-bundle` to merge definition files. Emit resulting file
into `.tmp/definitions-bundled`.
4. Run `rollup` to convert JS into UMD file (and possibly CJS/ESM).

### Dev


### Test