<template lang="pug">
.SvgMap
    svg(
        xmlns="http://www.w3.org/2000/svg",
        xmlns:xlink="http://www.w3.org/1999/xlink",
        version="1.1",
        width="100%",
        height="100%",
        :viewBox="`0 0 ${viewBoxW} ${viewBoxH}`",
        ref="svg",
        id="world-map",
    )
        g(:transform="`translate(${transX}, ${transY}) scale(${scale})`" ref="g")
            SvgMapPath(
                v-for="path in nations",
                :key="path.id",
                v-bind="path",
                v-on:mouseenter="show(path)",
                v-on:mouseleave="reset(path)",
                v-on:click="toggleFocused(path)",
            )

        path.zoom(d="M 100 27 l 0 6")
        path.zoom(d="M 97 30 l 6 0")
        path.zoom(d="M 97 50 l 6 0")
        circle.zoom(cx="100" cy="30" r="7" v-on:click="zoomin")
        circle.zoom(cx="100" cy="50" r="7" v-on:click="zoomout")
        text(id="host-container")
            HostDetail(
                v-for="tspan in hosts",
                :key="tspan.id",
                v-bind="tspan",
                v-on:mouseenter="enterTspan(tspan)",
                v-on:mouseleave="leaveTspan(tspan)",
                v-on:click="detailBox(tspan)",
            )
</template>

<script>
import SvgMapPath from "./SvgMapPath";
import HostDetail from "./HostDetail";
import {classHighlight, classReset, classDockUndock, hostEntries, createRetrieveHostDetail, HOSTS_COUNT} from "./map.js"

let svg_data = require('./world.js');
var detailedHosts = [];

export default {
    name: 'SvgMap',
    components: {
        SvgMapPath,
        HostDetail,
    },
    data() {
        return {
            viewBoxW: 1140,
            viewBoxH: 680,
            transX: -150,
            transY: 40,
            scale: 0.7,
            fontSize: 12,
            nations: svg_data.NATIONS,
            hosts: detailedHosts,
        };
    },
    setup(props) {
        console.log(props);
        detailedHosts = hostEntries(HOSTS_COUNT);
    },
    methods: {
        zoomin() {
            this.scale += 0.1;
            this.transX -= 80;
        },
        zoomout() {
            this.scale -= 0.1;
            this.transX += 80;
        },
        show(el) {
            classHighlight(el.d, el.class, this.transX, this.transY, this.fontSize);
        },
        reset(el) {
            classReset(el.class);
        },
        toggleFocused(el) {
            classDockUndock(el.class);
        },
        detailBox(tspan) {
            // TODO: fix!
            let addr = document.getElementById(tspan.id).innerText
            console.log("createRetrieveHostDetail: " + addr);
            createRetrieveHostDetail(addr, 12);
        },
        enterTspan(tspan) {
            document.getElementById(tspan.id).setAttribute("text-decoration", "underline");
        },
        leaveTspan(tspan) {
            document.getElementById(tspan.id).setAttribute("text-decoration", "none");
        },
    },
};
</script>

<style src="./map.css"></style>
