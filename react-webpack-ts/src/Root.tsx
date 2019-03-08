import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import * as routePathHelpers from '@app/helpers/routePath';

import App from '@app/components/App';

class Root extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Redirect
                        exact={true}
                        from={routePathHelpers.routePathProvider.ROOT}
                        to={routePathHelpers.routePathProvider.APP}
                    />
                    <Route path={routePathHelpers.routePathProvider.APP} component={App} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Root;
