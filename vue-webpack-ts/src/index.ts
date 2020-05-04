import Vue from 'vue';

import router from '@app/router';
import Root from '@app/root.vue';

Vue.config.productionTip = false;

function main() {
    new Vue({
        router,
        render: (h) => h(Root),
    }).$mount('#root');
}

export { main };
