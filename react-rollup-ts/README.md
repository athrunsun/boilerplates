# React-Rollup-TypeScript-Boilerplate
A React boilerplate with:

- Rollup as bundler
- Babel as transpiler, `tsc` only responsible for type checking
- [react-router](https://github.com/ReactTraining/react-router) as routing library
- Jest as testing framework
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

## Get Started
### View site locally
```sh
yarn run start
```

This will build all the source files, watch for changes, and serve them from [`http://localhost:3000`](http://localhost:3000) by default. All api calls are proxied to address configured by `REACT_APP_API_TARGET` in dotenv files.

To start the app with API mock enabled,

```sh
yarn run start:mock
```

To start a stand-alone mock server, so that we don't have to re-compile app code (by issuing `yarn run start:mock` again) everytime api mock is changed,

```sh
yarn run start:mock-server
```

### Generate production bundles
```sh
yarn run build
```

To view production bundles in browser,

```sh
yarn run serve
```

This will serve production bundles from [`http://localhost:3000`](http://localhost:3000) by default.

## Single-bundle/multi-bundles mode
This boilerplate is based on [Deploying ES2015+ Code in Production Today](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/), it will generate 2 bundles by default, one for modern browsers that support `<script type="module">`, one for browsers that do not.

By default this mode is **off**, and only **modern** bundle is injected into template `index.html`. To inject **legacy** bundle, issue yarn command with `OUTPUT_LEGACY_BUNDLE` set to string value of `true` explicitly.

To enable multi-bundle mode, issue yarn command with `MULTI_BUNDLES` set to string value of `true` explicitly.

## FAQ
### Why NOT Create-React-App?
CRA is good for beginners but its capability of deep customization does NOT suffice.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins so that I don't have to use Babel for awesome-typescript-loader (don't need to pipe TS and Babel)
- Simple
- Flexible
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
