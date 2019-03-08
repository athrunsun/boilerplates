import 'ts-polyfill';
import * as log from 'loglevel';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from '$app/App';

if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.WARN);
} else {
    log.setLevel(log.levels.DEBUG);
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
