<template>
    <SvgMap />
</template>

<script>
import SvgMap from './components/SvgMap.vue'
import {createTitle} from "./components/map.js"

export default {
    name: 'App',
    components: {
        SvgMap
    },
    mounted() {
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
  color: black;
  background: rgb(75, 75, 115);
}
</style>
