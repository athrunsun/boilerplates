import 'ts-polyfill';
import * as log from 'loglevel';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cssRaw } from 'typestyle';

import App from '@app/App';

if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.WARN);
} else {
    log.setLevel(log.levels.DEBUG);
}

cssRaw(`
    html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        margin: 0;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
`);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
