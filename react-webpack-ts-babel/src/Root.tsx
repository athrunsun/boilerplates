import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { cssRaw } from 'typestyle';

import * as routePathHelpers from '@app/helpers/routePath';

import App from '@app/components/App';

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
