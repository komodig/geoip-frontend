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

        path.zoom(d="M 100 37 l 0 6")
        path.zoom(d="M 97 40 l 6 0")
        path.zoom(d="M 97 60 l 6 0")
        circle.zoom(cx="100" cy="40" r="7" v-on:click="zoomIn")
        circle.zoom(cx="100" cy="60" r="7" v-on:click="zoomOut")
        polygon.move(points="120,42 140,50 120,58" v-on:click="moveLeft")
        polygon.move(points="80,42 60,50 80,58" v-on:click="moveRight")
        polygon.move(points="90,25 110,25 100,10" v-on:click="moveUp")
        polygon.move(points="90,75 110,75 100,90" v-on:click="moveDown")
        text(id="stat-container")
            StatDetail(
                v-for="hs in stats",
                :key="hs.id",
                v-bind="hs",
                v-on:click="moveRight",
            )
        text(id="host-container")
            HostDetail(
                v-for="tspan in hosts",
                :key="tspan.id",
                v-bind="tspan",
                v-on:mouseenter="enterTspan(tspan)",
                v-on:mouseleave="leaveTspan(tspan)",
                v-on:click="detailBox(tspan)",
            )
        text(id="detail-container")
            HostDetail(
                v-for="tspan in details",
                :key="tspan.id",
                v-bind="tspan",
                v-on:mouseenter="enterTspan(tspan)",
                v-on:mouseleave="leaveTspan(tspan)",
                v-on:click="hostDetailBox(tspan)",
            )
</template>

<script>
import SvgMapPath from "./SvgMapPath";
import HostDetail from "./HostDetail";
import StatDetail from "./StatDetail";
import {classHighlight,
    classReset,
    classDockUndock,
    preInitHostEntries,
    preInitStatEntries,
    createRetrieveHostDetail,
    createRetrieveMoreDetail,
    NMAP_ID,
} from "./map.js"

let svg_data = require('./world.js');
let countryHosts = [];
let countryStats = [];
let hostDetailAPIs =  [{"id": NMAP_ID}];

export default {
    name: 'SvgMap',
    components: {
        SvgMapPath,
        HostDetail,
        StatDetail,
    },
    data() {
        return {
            viewBoxW: 1150,
            viewBoxH: 2000,
            transX: -140,
            transY: 40,
            scale: 0.7,
            fontSize: 12,
            nations: svg_data.NATIONS,
            hosts: countryHosts,
            stats: countryStats,
            details: hostDetailAPIs,
        };
    },
    setup(props) {
        countryHosts = preInitHostEntries();
        countryStats = preInitStatEntries();
        },
    methods: {
        zoomIn() {
            this.scale += 0.2;
            this.transX -= 100;
        },
        zoomOut() {
            this.scale -= 0.2;
            this.transX += 100;
        },
        moveRight() {
            this.transX += 50;
        },
        moveLeft() {
            this.transX -= 50;
        },
        moveDown() {
            this.transY -= 50;
        },
        moveUp() {
            this.transY += 50;
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
        hostDetailBox(tspan) {
            createRetrieveMoreDetail(document.getElementById(tspan.id).getAttribute("addr"), 12, tspan.id);
        },
        detailBox(tspan) {
            createRetrieveHostDetail(document.getElementById(tspan.id).innerHTML, 12);
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
