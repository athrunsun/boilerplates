# React-Webpack-MPA-TypeScript-Boilerplate
A React boilerplate for multiple-page-application, with:

- Webpack as bundler
- TypeScript as transpiler
- Jest as testing framework
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

## Get started
```
yarn install
```

Development build (dev server started on port 3000):

```
yarn start
```

Development build with API mock (dev server started on port 3000):

```
yarn start:mock
```

Production build:

```
yarn build
```

Serve production bundle on your machine (express server started on port 5000):

```
yarn serve
```

## MPA
The bundled application has 2 entry points, `index.html` and `mobile.html`. The routing rules are:

- All requests to `/api` will be routed to `API_TARGET` configured in `.env.[NODE_ENV]`.
- All requests to `/m` will be routed to `/mobile.html`.
- All other requests will be routed to `/index.html`.

## FAQ
### Why NOT create-react-app?
CRA is good for beginners but its ability for customization is still NOT enough. I want to adjust TS/Webpack configuration based on my needs.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins so that I don't have to use Babel for awesome-typescript-loader (don't need to pipe TS and Babel)
- Simple
- Flexible
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
