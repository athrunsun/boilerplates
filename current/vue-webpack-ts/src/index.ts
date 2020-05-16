import Vue from 'vue';

import { getRouter, initRouter } from '@app/router';

Vue.config.productionTip = false;

async function main() {
    initRouter();

    const { default: Root } = await import('@app/root.vue');

    const vueInstance = new Vue({
        router: getRouter(),
        render: (h) => h(Root),
    });

    vueInstance.$mount('#root');
}

export { main };
