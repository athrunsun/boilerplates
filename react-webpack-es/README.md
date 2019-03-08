# React-Webpack-ECMAScript-Boilerplate
A React project boilerplate with:

- Webpack as bundler
- Babel as transpiler
- [react-router](https://github.com/ReactTraining/react-router) as routing library
- Jest as testing framework
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

## FAQ
### Why NOT create-react-app?
CRA is good for beginners but its ability for customization is still NOT enough. I want to adjust Babel/Webpack configuration based on my needs.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins
- Simple
- Flexible
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
