<template lang="pug">
tspan(
    :id="id",
    :class="class",
    ref="tspan",
)
</template>

<script>

export default {
    name: 'StatDetail',
    props: {
        id: String,
        class: String,
    },
};
</script>

<style>
tspan.stat-entry {
    font-weight: bold;
}
</style>
