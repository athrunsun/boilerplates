import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { cssRaw } from 'typestyle';

import * as commonUtils from '@/utils/common';

import * as routePathHelpers from '@/helpers/route-path';

const App = React.lazy(() => import('@/components/app'));

cssRaw(`
    html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        margin: 0;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
`);

function Root() {
    return (
        <BrowserRouter
            {...(!commonUtils.isEmpty(process.env.REACT_PUBLIC_PUBLIC_PATH) && {
                basename: process.env.REACT_PUBLIC_PUBLIC_PATH,
            })}
        >
            <Switch>
                <React.Suspense fallback={null}>
                    <Redirect
                        exact={true}
                        from={routePathHelpers.routePathProvider.ROOT}
                        to={routePathHelpers.routePathProvider.APP}
                    />
                    <Route path={routePathHelpers.routePathProvider.APP} component={App} />
                </React.Suspense>
            </Switch>
        </BrowserRouter>
    );
}

export default Root;
