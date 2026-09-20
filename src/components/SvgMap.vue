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
        rect#ocean(x="0", y="0", :width="viewBoxW", :height="viewBoxH")
        g(:style="mapTransform" ref="g")
            SvgMapPath(
                v-for="path in nations",
                :key="path.id",
                v-bind="path",
                v-on:mouseenter="show($event, path)",
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
            )
        svg(
            xmlns="http://www.w3.org/2000/svg",
            xmlns:xlink="http://www.w3.org/1999/xlink",
            version="1.1",
            width="100%",
            height="100%",
            :viewBox="`0 0 ${viewBoxW} ${viewBoxH}`",
            ref="svg",
            id="nav-container",
        )
            Pagination(
                v-for="polyg in pagenav",
                :key="polyg.id",
                v-bind="polyg",
                v-on:click="pagemove(polyg.dir)",
            )
        text(id="host-container")
            HostDetail(
                v-for="tspan in hosts",
                :key="tspan.id",
                v-bind="tspan",
                v-on:mouseenter="enterTspan(tspan)",
                v-on:mouseleave="leaveTspan(tspan)",
                v-on:click="detailBox($event, tspan)",
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
import SvgMapPath from "./SvgMapPath.vue";
import HostDetail from "./HostDetail.vue";
import StatDetail from "./StatDetail.vue";
import Pagination from "./Pagination.vue";
import * as svg_data from "./world.js";
import {classHighlight,
    classReset,
    classDockUndock,
    focusColors,
    unfocusColors,
    countryCenter,
    visibleCenterPoint,
    FOCUS_FADE_MS,
    preInitHostEntries,
    preInitStatEntries,
    preInitPaginEntries,
    createRetrieveHostDetail,
    createRetrieveMoreDetail,
    NMAP_ID,
} from "./map.js"


// one zoom "step" of the +/- buttons; click-locking zooms in by 4 of them
const ZOOM_STEP = 0.2;
const PAN_STEP = 50;
const MIN_SCALE = 0.2;
const FOCUS_ZOOM_STEPS = 4;

let countryHosts = [];
let countryStats = [];
let pagination = [];
let hostDetailAPIs =  [{"id": NMAP_ID}];

export default {
    name: 'SvgMap',
    components: {
        SvgMapPath,
        HostDetail,
        StatDetail,
        Pagination,
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
            pagenav: pagination,
            details: hostDetailAPIs,
            savedView: null,
            focusTimer: null,
        };
    },
    computed: {
        /*
         * driven as a css transform rather than the transform attribute:
         * attribute changes cannot be transitioned, a css transform on this
         * single <g> can be, which keeps pan/zoom off the javascript thread
         */
        mapTransform() {
            return {transform: `translate(${this.transX}px, ${this.transY}px) scale(${this.scale})`};
        },
    },
    setup(props) {
        countryHosts = preInitHostEntries();
        countryStats = preInitStatEntries();
        pagination = preInitPaginEntries();
        },
    methods: {
        applyView(scale, transX, transY) {
            // one assignment point for the whole view; css animates the rest
            this.scale = scale;
            this.transX = transX;
            this.transY = transY;
        },
        zoomBy(delta) {
            /*
             * zoom around the middle of the screen instead of shifting transX
             * by a fixed amount, so whatever the user is looking at stays put
             */
            let next = Math.max(MIN_SCALE, this.scale + delta);
            let c = visibleCenterPoint(this.viewBoxW / 2, this.viewBoxH / 2);
            this.applyView(next,
                c.x - (c.x - this.transX) * next / this.scale,
                c.y - (c.y - this.transY) * next / this.scale);
        },
        panBy(dx, dy) {
            this.applyView(this.scale, this.transX + dx, this.transY + dy);
        },
        zoomIn() {
            this.zoomBy(ZOOM_STEP);
        },
        zoomOut() {
            this.zoomBy(-ZOOM_STEP);
        },
        moveRight() {
            this.panBy(PAN_STEP, 0);
        },
        moveLeft() {
            this.panBy(-PAN_STEP, 0);
        },
        moveDown() {
            this.panBy(0, -PAN_STEP);
        },
        moveUp() {
            this.panBy(0, PAN_STEP);
        },
        focusCountry(name) {
            let center = countryCenter(name);
            if(!center)
                return;

            this.savedView = {"scale": this.scale, "transX": this.transX, "transY": this.transY};
            focusColors(name);

            // ...and only once the world has faded, move in on the country
            let next = this.scale + FOCUS_ZOOM_STEPS * ZOOM_STEP;
            clearTimeout(this.focusTimer);
            this.focusTimer = setTimeout(() => {
                let c = visibleCenterPoint(this.viewBoxW / 2, this.viewBoxH / 2);
                this.applyView(next, c.x - center.x * next, c.y - center.y * next);
            }, FOCUS_FADE_MS);
        },
        unfocusCountry(name) {
            clearTimeout(this.focusTimer);
            unfocusColors(name);
            if(this.savedView) {
                this.applyView(this.savedView.scale, this.savedView.transX, this.savedView.transY);
                this.savedView = null;
            }
        },
        show(ev, el) {
            classHighlight(ev, el.d, el.class, this.transX, this.transY, this.fontSize);
        },
        reset(el) {
            classReset(el.class);
        },
        toggleFocused(el) {
            let state = classDockUndock(el.class);
            if(state.docked)
                this.focusCountry(state.name);
            else
                this.unfocusCountry(state.name);
        },
        hostDetailBox(tspan) {
            createRetrieveMoreDetail(document.getElementById(tspan.id).getAttribute("addr"), 12, tspan.id);
        },
        detailBox(ev, tspan) {
            createRetrieveHostDetail(ev, document.getElementById(tspan.id).innerHTML, 12);
        },
        enterTspan(tspan) {
            document.getElementById(tspan.id).setAttribute("text-decoration", "underline");
        },
        leaveTspan(tspan) {
            document.getElementById(tspan.id).setAttribute("text-decoration", "none");
        },
        pagemove(dir) {
            if(dir == "left")
                console.log(dir);
            else if(dir == "right")
                console.log(dir);
            else if(dir == "in")
                console.log(dir);
            else
                console.log("error: pagemove: unknown dir")
        }
    },
};
</script>

<style src="./map.css"></style>
