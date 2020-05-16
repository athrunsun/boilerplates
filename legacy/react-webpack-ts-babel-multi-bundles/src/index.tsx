import React from 'react';
import ReactDOM from 'react-dom';

import Root from '@app/Root';

function main() {
    ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
}

export { main };
