import '@babel/polyfill';

import * as log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';

import App from '@app/App';

if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.WARN);
} else {
    log.setLevel(log.levels.DEBUG);
}

ReactDOM.render(<App />, document.getElementById('root'));
