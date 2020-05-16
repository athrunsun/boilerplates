import React, { FunctionComponent } from 'react';

import ErrorBoundary from '@app/components/error-boundary';
import BuggyCounter from '@app/components/buggy-counter';

function ErrorBoundaryTest() {
    return (
        <ErrorBoundary>
            <BuggyCounter />
        </ErrorBoundary>
    );
}

export default ErrorBoundaryTest as FunctionComponent;
