import Vue from 'vue';
import VueRouter from 'vue-router';

let router: VueRouter;

function getRouter() {
    return router;
}

function initRouter() {
    Vue.use(VueRouter);

    router = new VueRouter({
        mode: 'history',
        base: process.env.PUBLIC_PATH,
        routes: [
            {
                path: '/',
                redirect: '/app',
            },
            {
                path: '/app',
                component: () => import('@app/components/app.vue'),
                children: [
                    {
                        path: 'home',
                        component: () => import('@app/components/home.vue'),
                    },
                    {
                        path: 'dynamic',
                        component: () => import('@app/components/dynamic-comp.vue'),
                    },
                    {
                        path: '',
                        component: () => import('@app/components/home.vue'),
                    },
                ],
            },
        ],
    });

    return router;
}

export { getRouter, initRouter };
