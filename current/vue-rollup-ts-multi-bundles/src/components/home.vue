<template>
    <section>
        <div class="test-color">This is the home page...</div>
        <template v-if="onDevEnv">
            <div>If you see document's title changed to '{{ docTitle }}', api mock works.</div>
        </template>
    </section>
</template>

<style lang="less">
// https://github.com/egoist/rollup-plugin-postcss#imports
// `~@app/components/...` only works for scss/sass files when using rollup-plugin-postcss.
@import './app.less';
</style>

<script lang="ts">
import Vue from 'vue';

import * as titleServices from '@app/services/title';

// `@import` does NOT work in `<style>` block
import '@app/components/app.css';

export default Vue.extend({
    name: 'Home',
    data() {
        return {
            onDevEnv: process.env.NODE_ENV === 'development',
            docTitle: '',
        };
    },
    mounted() {
        if (this.onDevEnv) {
            titleServices.requestTitle().then((response) => {
                this.docTitle = response.data.data;
                document.title = response.data.data;
            });
        }
    },
});
</script>
