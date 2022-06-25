import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from '@/root';

const container = document.getElementById('root');

if (container == null) {
    throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(<Root />);
