<template lang="pug">
tspan(
    :id="id",
    class="host-entry",
    v-on:click="detailBox(entry)",
    ref="tspan",
)
</template>

<script>
import {createRetrieveHostDetail} from "./map.js"

export default {
    name: 'HostDetail',
    props: {
        id: String,
        class: String,
    },
    methods: {
        detailBox(el) {
            createRetrieveHostDetail(el.innerHTML, 12);
        }
    },
};
</script>

<style scoped>
.host-entry:hover {
    color: white;
}
</style>
