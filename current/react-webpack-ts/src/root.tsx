import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as commonUtils from '@/utils/common';

import * as routePathHelpers from '@/helpers/route-path';

import '@/root.css';

const App = React.lazy(() => import('@/routes/app'));
const RootRoute = React.lazy(() => import('@/routes/root-route'));

function Root() {
    return (
        <StrictMode>
            <React.Suspense fallback={null}>
                <BrowserRouter
                    {...(!commonUtils.isEmpty(process.env.REACT_PUBLIC_PUBLIC_PATH) && {
                        basename: process.env.REACT_PUBLIC_PUBLIC_PATH,
                    })}
                >
                    <Routes>
                        <Route path={routePathHelpers.routePathProvider.ROOT} element={<RootRoute />} />
                        <Route path={routePathHelpers.routePathProvider.APP} element={<App />} />
                    </Routes>
                </BrowserRouter>
            </React.Suspense>
        </StrictMode>
    );
}

export default Root;
