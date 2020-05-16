import Vue from 'vue';

import router from '@app/router';
import Root from '@app/Root.vue';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(Root),
}).$mount('#root');
