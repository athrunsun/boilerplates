import React from 'react';
import ReactDOM from 'react-dom';

import Root from '@app/root1';

function main() {
    ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
}

export { main };
