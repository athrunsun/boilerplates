# React-Parcel-TypeScript-Boilerplate
A React boilerplate with:

- [Parcel](https://github.com/parcel-bundler/parcel) as bundler and task runner
- TypeScript as transpiler
- (No testing framework baked in yet)
- [typestyle](https://github.com/typestyle/typestyle) as css-in-js library

## FAQ
### Why NOT create-react-app?
CRA is good for beginners but its ability for customization is still NOT enough. I want to adjust TS/Webpack configuration based on my needs.

### Why Parcel instead of Webpack?
The former is easier to configure than the latter.

### Why `typestyle` but not any other css-in-js library?
Pros:
- Does NOT introduce extra Babel plugins so that I don't have to use Babel for awesome-typescript-loader (don't need to pipe TS and Babel)
- Simple
- Flexible
- I prefer writing everything in JS: JSX, css-in-js, Babel/Jest/ESLint configurations
