import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as routePathHelpers from '@/helpers/route-path';

function RootRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(routePathHelpers.routePathProvider.ROOT);
    });

    return null;
}

export default RootRoute;
