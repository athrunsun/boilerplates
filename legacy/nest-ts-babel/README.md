# Nest-TypeScript-Babel-Boilerplate (POC)
A [Nest](https://github.com/nestjs/nest) TypeScript boilerplate that uses Babel during transpilation in addition to `tsc`.

This is just a **POC** and **NOT ideal** - there's TOO MUCH configuration overhead.

Why use `tsc` and `babel` together to transpile code twice? See this problem below.

# Problem: `tsc` does NOT translate import paths
In the code emitted by `tsc`, import paths with path aliases (defined in `tsconfig.json`) are preserved, thus NOT recognizable by `node` executable.

## Solution
We have several options to deal with this:
1. Use `babel-node` to transpile the code and start the app, use [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver) to translate import paths.
2. Use `tsc` to transpile TS, then, transpile emitted ES with `babel` and `babel-plugin-module-resolver` will translate import paths, use `node` to start the app.
3. Use [`tsmodule-alias`](https://github.com/momoThePug/tsmodule-alias), [tsconfig-paths](https://github.com/dividab/tsconfig-paths), or [module-alias](https://github.com/ilearnio/module-alias) to resolve import paths during runtime.

### Option #1
When using `babel-node`, code is transpiled only by `babel`, and this is when **TS decorators' metadata is lost** in the emitted code.

Reference:
- [#1824 Babel 7 Typescript compatibility](https://github.com/nestjs/nest/issues/1824)
- [#9681 @babel/typescript removed types which prevents decorator metadata from being emitted](https://github.com/babel/babel/issues/9681)
- [Metadata retention with Typescript, Babel 7, Decorators](https://stackoverflow.com/questions/53015862)

To address it, we can use [`babel-plugin-transform-typescript-metadata`](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata). The reason of metadata lost is explained in its motivation:

> TypeScript Decorators allows advanced reflection patterns when combined with [`Reflect.metadata`](https://rbuckton.github.io/reflect-metadata/) output.
> 
> Current `@babel/preset-typescript` implementation however just strips all types and does not emit the relative Metadata in the output code.
> 
> Since this kind of information is used extensively in libraries like [Nest](https://github.com/nestjs/nest) and [TypeORM](https://github.com/typeorm/typeorm) to implement advanced features like **Dependency Injection**, I've thought it would be awesome to be able to provide the same functionality that [TypeScript compiler `experimentalDecorators` and `emitDecoratorMetadata` flags](https://www.typescriptlang.org/docs/handbook/decorators.html) provide.

But also NOTE this plugin has [pitfalls](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata#current-pitfalls), so this is still NOT very ideal.

### Option #2
Code is transpiled twice, also it will cause additional configuration overhead. The benefit is `babel-plugin-transform-typescript-metadata` is NOT required any more.

### Option #3
Performance might be a concern.

Reference:
- [#59 tsconfig-paths safe for production?](https://github.com/dividab/tsconfig-paths/issues/59)

### Summary
To me, the option #2 looks like the most promising.

To monitor code changes, we have the following combinations:
1. `nodemon` + `babel-node`
2. [`tsc-watch`](https://github.com/gilamran/tsc-watch) + `babel` + `node`
3. `nodemon` + `tsc` + `babel` + `node`

`babel-node` is abandoned, the 2nd one and the 3rd are implemented in this boilerplate.

As a result the finally determined development build process is:
- `tsc-watch` transpiles TS into ES with inline sourcemap (useful for debugging) in watch mode, emitted code is in `build/dev_tsc_output`.
    - To have inline sourcemap, we need `"sourceMap": false`, `"inlineSources": true`, `"inlineSourceMap": true` in `compilerOptions` in `tsconfig.dev.json`.
- `babel` transpiles ES emitted by `tsc` into ES with inline sourcemap, additionally translating absolute import path (like `import a from '@app/A'`) to relative path (like `import a from './A'`), emitted code is in `build/dev`.
    - `babel.cli.config.js` is used as babel's configuration file. Pay attention that, `babel` is transpiling `tsc`'s output, `@app` should be mapped to `build/dev_tsc_output`.
    - To output inline sourcemap with `babel`, according to [Typescript sourcemaps using command-line Babel](https://stackoverflow.com/a/37799745/1239295), we need pass `--source-maps inline`.
- Start the app with `node build/dev/main.js`.

Production build process is a little bit different - it uses `tsc` instead of `tsc-watch` since watch mode is unnecessary, also it doesn't have inline sourcemap, which is also unnecessary.

However, as for testing, since I want to use `babel-jest` in place of `ts-jest`, `babel-node` and `babel-plugin-transform-typescript-metadata` are required. `babel.config.js` is used as configuration file of `babel-jest`.
