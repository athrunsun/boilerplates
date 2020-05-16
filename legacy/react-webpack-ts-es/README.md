# React-Webpack-TypeScript-ECMAScript-Boilerplate (POC)
A React boilerplate with:

- Webpack as bundler
- TypeScript and Babel as transpiler (first transpile ES into ES6 by `tsc` then by Babel)
- Jest as testing framework
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

## WARNING
Please NOTE that this boilerplate is just a **proof of concept**. It is NOT used in a real project and is NOT recommended because:

- Piping TS and Babel is very annoying - it raises the complexity of configuration thus raises maintenance cost.
- TS is best for transpiling TS!

## FAQ
### Why NOT create-react-app?
CRA is good for beginners but its ability for customization is still NOT enough. I want to adjust TS/Babel/Webpack configuration based on my needs.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins
- Simple
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
