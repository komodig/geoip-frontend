<template>
    <SvgMap />
</template>

<script>
import SvgMap from './components/SvgMap.vue'
import {createTitle, initPage} from "./components/map.js"

export default {
    name: 'App',
    components: {
        SvgMap
    },
    mounted() {
        initPage();
        createTitle();
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(255,255,255);
}
</style>
