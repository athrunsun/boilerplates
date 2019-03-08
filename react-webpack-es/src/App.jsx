import * as log from 'loglevel';
import React from 'react';
import { style, cssRule } from 'typestyle';

import * as titleServices from '@app/services/title';

cssRule('body', {
    margin: 0,
});

const moduleStyles = {
    container: style({
        $debugName: 'container',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#eee',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        $nest: {
            '& > div': {
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
};

class App extends React.Component {
    state = {
        docTitle: '',
    };

    componentDidMount() {
        if (process.env.NODE_ENV === 'development') {
            titleServices.requestTitle().then(response => {
                this.setState({ docTitle: response.data.data });
                document.title = response.data.data;
            });
        }
    }

    render() {
        const { docTitle } = this.state;

        return (
            <div className={moduleStyles.container}>
                <div>This is the app page...</div>
                {process.env.NODE_ENV === 'development' && (
                    <div>{`If you see document's title changed to '${docTitle}', api mock works.`}</div>
                )}
            </div>
        );
    }
}

if (process.env.NODE_ENV === 'development') {
    (async () => {
        log.debug(
            'You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.',
        );
    })();
}

export default App;
