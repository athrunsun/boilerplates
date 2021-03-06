import Vue from 'vue';
import Router from 'vue-router';

import App from '@app/components/App.vue';
import Home from '@app/components/Home.vue';

const DynamicComp = () => import('@app/components/DynamicComp.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
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
                    component: DynamicComp,
                },
                {
                    path: '',
                    component: Home,
                },
            ],
        },
    ],
});
