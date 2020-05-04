<template>
    <div class="container">
        <img class="logo" alt="Vue Logo" :src="logo" />
        <div class="nav">
            <router-link :to="routePathProvider.APP">Home</router-link> |
            <router-link :to="routePathProvider.DYNAMIC_COMP_TEST">Dynamic Component Test</router-link>
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

<style lang="less">
.container {
    height: 100vh;
    width: 100vw;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        font-size: 2rem;
        padding: 1rem;
        background-color: #ccc;
        border-radius: 0.8rem;
    }

    div:not(:last-child) {
        margin-bottom: 1rem;
    }

    section div {
        font-size: 2rem;
        padding: 1rem;
        background-color: #ccc;
        border-radius: 0.8rem;
    }

    section div:not(:last-child) {
        margin-bottom: 1rem;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';

import * as routePathHelpers from '@app/helpers/route-path';

import logo from '@app/assets/logo.png';

if (process.env.NODE_ENV === 'development') {
    (async function () {
        console.log(
            'You have async support if you read this instead of "ReferenceError: regeneratorRuntime is not defined" error.',
        );
    })();
}

export default Vue.extend({
    name: 'App',
    data() {
        return {
            logo,
            onDevEnv: process.env.NODE_ENV === 'development',
            routePathProvider: routePathHelpers.routePathProvider,
        };
    },
});
</script>
