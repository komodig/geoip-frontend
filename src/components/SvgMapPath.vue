<template lang="pug">
g.SvgMapPath
    path(
        :d="d",
        :id="id",
        :class="class",
        ref="path",
    )
</template>

<script>
export default {
    name: 'SvgMapPath',
    props: {
        id: String,
        class: String,
        d: String,
    },
};
</script>

<style scoped>
.SvgMapPath {
    fill: rgb(140,200,80);
    stroke: rgb(75, 45,115);
    stroke-width: 0.5;
}
</style>
