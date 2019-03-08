import '@babel/polyfill';

import * as log from 'loglevel';

import Vue from 'vue';
import App from '@app/App.vue';

if (process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.WARN);
} else {
    log.setLevel(log.levels.DEBUG);
}

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
