<template lang="pug">
g.SvgMapPath
    path(
      :code="code",
      :d="d",
      :name="name",
      :classid="classid",
      v-on="$listeners",
      ref="path",
      :style="{fill: fill}"
    )
</template>

<script>
export default {
  name: 'SvgMapPath',
  props: {
    code: String,
    name: String,
    classid: String,
    d: String,
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
