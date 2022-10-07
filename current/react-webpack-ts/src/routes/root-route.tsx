import React from 'react';
import { Navigate } from 'react-router-dom';

import * as routePathHelpers from '@/helpers/route-path';

function RootRoute() {
    return <Navigate to={routePathHelpers.routePathProvider.APP} />;
}

export default RootRoute;
