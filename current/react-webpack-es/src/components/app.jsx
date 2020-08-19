import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { style, cssRule } from 'typestyle';

import * as routePathHelpers from '@/helpers/route-path';

import * as titleServices from '@/services/title';

import logo from '@/assets/logo.svg';

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
                color: '#aaa',
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
            <Route
                exact={true}
                path={routePathHelpers.routePathProvider.APP}
                render={() => (
                    <>
                        <div>This is the home page...</div>
                        {process.env.NODE_ENV === 'development' && (
                            <div>{`If you see document's title changed to '${docTitle}', api mock works.`}</div>
                        )}
                    </>
                )}
            />
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

export default App;
