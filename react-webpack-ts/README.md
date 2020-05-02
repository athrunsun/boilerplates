# React-Webpack-TypeScript-Babel-Multi-Bundles-Boilerplate
A React boilerplate with:

- Webpack as bundler
- Babel as transpiler, `tsc` only responsible for type checking
- [react-router](https://github.com/ReactTraining/react-router) as routing library
- Jest as testing framework
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

This boilerplate is based on [Deploying ES2015+ Code in Production Today](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/).

## Get Started
### View site locally
```sh
yarn run start
```

This will build all the source files, watch for changes, and serve them from [`http://localhost:3000`](http://localhost:3000) by default.

To start the app with API mock enabled,

```sh
yarn run start:mock
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

## FAQ
### Why NOT create-react-app?
CRA is good for beginners but its ability for customization is still NOT enough. I want to adjust TS/Webpack configuration based on my needs.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins so that I don't have to use Babel for awesome-typescript-loader (don't need to pipe TS and Babel)
- Simple
- Flexible
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
