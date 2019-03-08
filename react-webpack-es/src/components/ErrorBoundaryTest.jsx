import React from 'react';

import ErrorBoundary from '@app/components/ErrorBoundary';
import BuggyCounter from '@app/components/BuggyCounter';

class ErrorBoundaryTest extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <BuggyCounter />
            </ErrorBoundary>
        );
    }
}

export default ErrorBoundaryTest;
