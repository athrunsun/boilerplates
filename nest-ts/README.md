# Nest-TypeScript-Boilerplate
A [Nest](https://github.com/nestjs/nest) TypeScript boilerplate.

# Development launching process
- Use `ts-node` with `tsconfig-paths` registered so that import path aliases in `tsconfig.json` can be recognized.

There's no watch mode for development environment, b/c, unlike webpack with which we can hot-reload the modified part, we will have to restart the whole nest server anyway.

# Production build process
- `tsc` to transpile TypeScript.
- `babel-cli` to transpile ES emitted by `tsc`, and import paths will be translated by [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver).
