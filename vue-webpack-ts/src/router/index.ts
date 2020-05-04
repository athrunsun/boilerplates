import Vue from 'vue';
import Router from 'vue-router';

import App from '@app/components/app.vue';
import Home from '@app/components/home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.PUBLIC_PATH,
    routes: [
        {
            path: '/',
            redirect: '/app',
        },
        {
            path: '/app',
            component: App,
            children: [
                {
                    path: 'home',
                    component: Home,
                },
                {
                    path: 'dynamic',
                    component: () => import('@app/components/dynamic-comp.vue'),
                },
                {
                    path: '',
                    component: Home,
                },
            ],
        },
    ],
});
