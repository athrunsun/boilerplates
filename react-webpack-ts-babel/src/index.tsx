import '@babel/polyfill';

import * as log from 'loglevel';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from '@app/Root';

if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.WARN);
} else {
    log.setLevel(log.levels.DEBUG);
}

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
