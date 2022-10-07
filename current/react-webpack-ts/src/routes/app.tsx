import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import * as routePathHelpers from '@/helpers/route-path';

import * as titleServices from '@/services/title';

import * as moduleStyles from '@/routes/app.css';

import logo from '@/assets/logo.svg';

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
            <>
                <div>This is the home page...</div>
                {process.env.NODE_ENV === 'development' && (
                    <div>{`If you see document's title changed to '${docTitle}', api mock works.`}</div>
                )}
            </>
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
