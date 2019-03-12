<template>
    <div v-bind:class="moduleStyles.container">
        <img class="logo" alt="Vue Logo" src="@app/assets/logo.png" />
        <div>This is the app page...</div>
        <template v-if="onDevEnv">
            <div>If you see document's title changed to '{{ docTitle }}', api mock works.</div>
        </template>
    </div>
</template>

<style>
body {
    margin: 0;
}
</style>

<style scoped>
.logo {
    width: 15rem;
    height: 15rem;
}
</style>

<script>
import * as log from 'loglevel';
import { style } from 'typestyle';

import * as titleServices from '@app/services/title';

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

if (process.env.NODE_ENV === 'development') {
    (async () => {
        log.debug(
            'You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.',
        );
    })();
}

export default {
    data: function() {
        return {
            onDevEnv: process.env.NODE_ENV === 'development',
            docTitle: '',
            moduleStyles,
        };
    },
    mounted: function() {
        if (process.env.NODE_ENV === 'development') {
            titleServices.requestTitle().then(response => {
                this.docTitle = response.data.data;
                document.title = response.data.data;
            });
        }
    },
};
</script>
