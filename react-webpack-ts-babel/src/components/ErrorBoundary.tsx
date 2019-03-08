import * as React from 'react';
import { ErrorInfo } from 'react';
import { style } from 'typestyle';

interface IState {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<any, IState> {
    public state: IState = {
        error: null,
        errorInfo: null,
    };

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    public render() {
        const { children } = this.props;
        const { error, errorInfo } = this.state;

        if (errorInfo) {
            // Error path
            return (
                <div className={style({ display: 'flex', flexDirection: 'column' })}>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br />
                        {errorInfo && errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        // Normally, just render children
        return children;
    }
}

export default ErrorBoundary;
