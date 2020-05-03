import React, { useState, useEffect, FunctionComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import { style, cssRule } from 'typestyle';

import * as routePathHelpers from '@app/helpers/routePath';

import * as titleServices from '@app/services/title';

import ErrorTest from '@app/components/ErrorBoundaryTest';

import '@app/components/App.css';
import '@app/components/app.less';
import logo from '@app/assets/logo.svg';

const DynamicComp = React.lazy(() => import('@app/components/DynamicComp'));

cssRule('body', {
    margin: 0,
});

const moduleStyles = {
    container: style({
        $debugName: 'container',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#eee',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        $nest: {
            '& > div': {
                display: 'flex',
                fontSize: '2rem',
                padding: '1rem',
                backgroundColor: '#ccc',
                borderRadius: '0.8rem',
            },
            '& > div:not(:last-child)': {
                marginBottom: '1rem',
            },
        },
    }),
    logo: style({
        width: '15rem',
        height: '15rem',
    }),
};

function App() {
    const [docTitle, setDocTitle] = useState('');

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            titleServices.requestTitle().then((response) => {
                setDocTitle(response.data.data);
                document.title = response.data.data;
            });
        }
    }, []);

    return (
        <div className={moduleStyles.container}>
            <img className={moduleStyles.logo} alt="React Logo" src={logo} />
            <div className={style({ display: 'flex' })}>
                <Link to={routePathHelpers.routePathProvider.APP}>Home</Link> |{' '}
                <Link to={routePathHelpers.routePathProvider.ERROR_BOUNDARY_TEST}>ErrorBoundary Test</Link> |{' '}
                <Link to={routePathHelpers.routePathProvider.DYNAMIC_LOAD_TEST}>Dynamic Load Test</Link>
            </div>
            <React.Suspense fallback={null}>
                <Route
                    exact={true}
                    path={routePathHelpers.routePathProvider.APP}
                    render={() => (
                        <>
                            <div className="test-color">This is the home page...</div>
                            {process.env.NODE_ENV === 'development' && (
                                <div>{`If you see document's title changed to '${docTitle}', api mock works.`}</div>
                            )}
                        </>
                    )}
                />
                <Route
                    exact={true}
                    path={routePathHelpers.routePathProvider.ERROR_BOUNDARY_TEST}
                    component={ErrorTest}
                />
                <Route
                    exact={true}
                    path={routePathHelpers.routePathProvider.DYNAMIC_LOAD_TEST}
                    component={DynamicComp}
                />
            </React.Suspense>
        </div>
    );
}

if (process.env.NODE_ENV === 'development') {
    (async () => {
        console.log(
            'You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.',
        );
    })();
}

export default App as FunctionComponent;
