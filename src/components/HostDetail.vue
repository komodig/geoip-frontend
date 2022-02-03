<template lang="pug">
tspan(
    :id="id",
    class="host-entry",
    ref="tspan",
)
</template>

<script>

export default {
    name: 'HostDetail',
    props: {
        id: String,
        class: String,
    },
};
</script>

<style scoped>
.host-entry:hover {
    color: white;
}
</style>
