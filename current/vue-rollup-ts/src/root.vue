<template>
    <div id="root">
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Root',
});
</script>

<style>
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
*,
*::before,
*::after {
    box-sizing: inherit;
}
body {
    margin: 0;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
        sans-serif;
}
</style>
