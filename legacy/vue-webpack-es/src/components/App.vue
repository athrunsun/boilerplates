<template>
    <div v-bind:class="moduleStyles.container">
        <img class="logo" alt="Vue Logo" src="@app/assets/logo.png" />
        <div class="nav">
            <router-link v-bind:to="routePathProvider.APP">Home</router-link> |
            <router-link v-bind:to="routePathProvider.DYNAMIC_COMP_TEST">Dynamic Component Test</router-link>
        </div>
        <router-view />
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
.nav {
    display: flex;
}
</style>

<script>
import Vue from 'vue';
import { style } from 'typestyle';

import { routePathProvider } from '@app/helpers/routePath';

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
            '& div': {
                fontSize: '2rem',
                color: '#aaa',
                padding: '1rem',
                backgroundColor: '#ccc',
                borderRadius: '0.8rem',
            },
            '& div:not(:last-child)': {
                marginBottom: '1rem',
            },
            '& section div': {
                fontSize: '2rem',
                color: '#aaa',
                padding: '1rem',
                backgroundColor: '#ccc',
                borderRadius: '0.8rem',
            },
            '& section div:not(:last-child)': {
                marginBottom: '1rem',
            },
        },
    }),
};

if (process.env.NODE_ENV === 'development') {
    (async function() {
        console.log(
            'You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.',
        );
    })();
}

export default Vue.extend({
    name: 'App',
    data() {
        return {
            onDevEnv: process.env.NODE_ENV === 'development',
            moduleStyles,
            routePathProvider,
        };
    },
});
</script>
