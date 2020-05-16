<template>
    <section>
        <div>This is the home page...</div>
        <template v-if="onDevEnv">
            <div>If you see document's title changed to '{{ docTitle }}', api mock works.</div>
        </template>
    </section>
</template>

<script>
import Vue from 'vue';

import * as titleServices from '@app/services/title';

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
            titleServices.requestTitle().then(response => {
                this.docTitle = response.data.data;
                document.title = response.data.data;
            });
        }
    },
});
</script>
