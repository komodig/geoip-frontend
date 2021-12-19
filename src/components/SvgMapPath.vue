<template lang="pug">
g.SvgMapPath
    path(
      :id="id",
      :d="d",
      :title="title",
      :fill="fill",
      v-on="$listeners",
      ref="path",
      :style="{fill: fill}"
    )
</template>

<script>
export default {
  name: 'SvgMapPath',
  props: {
    id: String,
    title: String,
    d: String,
    fill: [String, Number],
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SvgMapPath {
    fill: rgb(148,193,32);
    stroke: red;
    stroke-width: 0.5;
}
</style>
