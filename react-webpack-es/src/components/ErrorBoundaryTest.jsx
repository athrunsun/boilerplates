import React from 'react';

import ErrorBoundary from '@app/components/ErrorBoundary';
import BuggyCounter from '@app/components/BuggyCounter';

function ErrorBoundaryTest() {
    return (
        <ErrorBoundary>
            <BuggyCounter />
        </ErrorBoundary>
    );
}

export default ErrorBoundaryTest;
