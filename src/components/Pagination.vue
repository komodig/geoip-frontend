<template lang="pug">
polygon(
    :id="id",
    :class="class",
    :points="points",
    ref="polygon",
)
</template>

<script>

export default {
    name: 'Pagination',
    props: {
        id: String,
        class: String,
        points: String,
    },
};
</script>

<style>
polygon.pagination {
    stroke: black;
    stroke-width: 1;
    fill: grey;
    fill-opacity: 0.3;
}
polygon.pagination:hover {
    stroke: white;
}
</style>
