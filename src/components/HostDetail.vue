<template lang="pug">
.HostDetail
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
.host-entry{
    fill: rgb(140,200,80);
    stroke: rgb(75, 45,115);
    stroke-width: 0.5;
}
</style>
