# React-Webpack-TypeScript-Babel-Boilerplate
A React project boilerplate with:

- Webpack as bundler
- Babel as transpiler, `tsc` only responsible for type checking
- [react-router](https://github.com/ReactTraining/react-router) as routing library
- Jest as testing framework
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

## FAQ
### Why NOT create-react-app?
CRA is good for beginners but its ability for customization is still NOT enough. I want to adjust TS/Webpack configuration based on my needs.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins so that I don't have to use Babel for awesome-typescript-loader (don't need to pipe TS and Babel)
- Simple
- Flexible
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
