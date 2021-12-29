<template>
  <SvgMap />
</template>

<script>
import SvgMap from './components/SvgMap.vue'

export default {
  name: 'App',
  components: {
    SvgMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background: rgb(190, 200,240);
}
</style>
