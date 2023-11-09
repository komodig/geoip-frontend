const ipdata = require('./hosts.js');
const moment = require('moment');

export const STATS_LINES = 3;
export const HOSTS_COUNT = 100;
export const NMAP_ID = 'nmap';

// tag-ids + classes
const CONTAINER_ID = "world-map";
const STAT_CONTAINER = "stat-container";
const NAV_CONTAINER = "nav-container";
const HOST_CONTAINER = "host-container";
const DETAIL_CONTAINER = "detail-container";
const DETAIL_BOX = "host-detail-box";
const DETAIL_TEXT = "host-detail-text";
const NMAP_BOX = "nmap-detail-box";
const NMAP_TEXT = "nmap-detail-text";

// created elements' class to be removed on reset
const CONTEXT_CLASS = "nation-context";


function boxLayout(x, y, name, boxid, width, height, fontSize) {
    let box = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    // adjust box width if it is too small for name
    if ((name.length + 3) * (fontSize/2) > width)
        box.setAttribute("finalWidth", (name.length + 3) * (fontSize/2));
    else
        box.setAttribute("finalWidth", width);

    box.setAttribute("finalHeight", height);

    box.setAttribute("id", boxid);
    box.setAttribute("class", CONTEXT_CLASS);
    box.setAttribute("x", x);
    box.setAttribute("y", y);
    box.setAttribute("width", 1);
    box.setAttribute("height", 1);
    box.setAttribute("fill", "LightGrey");
    box.setAttribute("fill-opacity", 0.7);
    box.setAttribute("stroke-width", 1);
    box.setAttribute("stroke", "black");

    return box;
}

function infoTextLayout(x, y, name, fontSize, textId, classId) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("id", textId);
    text.setAttribute("class", classId);
    text.setAttribute("x", x + fontSize/2);
    text.setAttribute("y", y + fontSize*1.2);
    text.setAttribute("font-size", fontSize);
    text.innerHTML = name;

    return text;
}

function createTextLayout(x, y, textArr, fontSize, textId) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("id", textId);
    text.setAttribute("class", CONTEXT_CLASS);
    text.setAttribute("x", x + fontSize/2);
    text.setAttribute("y", y + fontSize*1.2);
    for(let i=0; i < textArr.length; i++) {
        let row = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        row.setAttribute("x", x + fontSize/2);
        row.setAttribute("y", y + fontSize+fontSize*1.2*i);
        row.setAttribute("font-size", fontSize);
        row.innerHTML = textArr[i];
        text.appendChild(row);
    }

    return text;
}

function useTextLayout(x, y, textArr, fontSize, textId) {
    /*
     * re-use static text->tspan (or whatever) elements
     * by filling-in content (i.e. innerHTML) from REST-API
     * useful for elements defined with events in SvgMap.vue
     */
    let text = document.getElementById(textId);
    text.setAttribute("x", x + fontSize/2);
    text.setAttribute("y", y + fontSize*1.2);
    text.style.visibility = "visible";
    let children = Array.from(text.children);
    for(let i=0; i < children.length; i++) {
        children[i].innerHTML = (textArr[i] ? textArr[i] : "");
        children[i].setAttribute("font-size", fontSize);
        children[i].setAttribute("x", x + fontSize/2);
        children[i].setAttribute("dy", fontSize*1.1);
    }

    return text;
}

function usePaginationLayout(x, y, fontSize, svgId) {
    /*
     * re-use static svg->polygon elements
     * by setting attributes (e.g. graph points)
     */
    let svg = document.getElementById(svgId);
    svg.style.visibility = "visible";
    let children = Array.from(svg.children);
    children[0].setAttribute("points", `${x + fontSize},${y} ${x},${y + fontSize/2} ${x + fontSize},${y + fontSize}`); // "870,42 850,50 870,58"
    children[1].setAttribute("points", `${x + 2*fontSize},${y} ${x +  2*fontSize},${y + fontSize} ${x + 3*fontSize},${y + fontSize} ${x + 3*fontSize},${y}`); //"890,42, 890,58, 900,58 900,42"
    children[2].setAttribute("points", `${x + 4*fontSize},${y} ${x + 5*fontSize},${y + fontSize/2} ${x + 4*fontSize},${y + fontSize}`); // "920,42 940,50 920,58"

    return svg;
}

function growBox(action_callback) {
    let startTime = 0;
    const totalTime = 200;
    // nested function
    const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        // progress from 0 to 1 over totalTime
        const progress = (timestamp - startTime) / totalTime;
        try {
            action_callback(progress);
        } catch(err) {
            void(0);
        }
        if (progress < 1) {
            window.requestAnimationFrame(animateStep);
        }
    }
    window.requestAnimationFrame(animateStep);
}

function createAnimatedBox(x, y, name, boxId, width, height, fontSize) {
    let container = document.getElementById(CONTAINER_ID);

    container.appendChild(boxLayout(x, y, name, boxId, width, height, fontSize));

    growBox((progress) => {
        let box = document.getElementById(boxId);
        box.setAttribute('width', box.getAttribute('finalWidth') * progress);
    });
    growBox((progress) => {
        let box = document.getElementById(boxId);
        box.setAttribute('height', box.getAttribute('finalHeight') * progress);
    });

    return container;
}

function middlePos(center, mouse) {
    if(mouse > center)
        return ((mouse - center) / 2) + center*0.7;
    else
        return ((center - mouse) / 2) + mouse*0.7;
}

function createNameBox(name, x, y, fontSize) {
    let container = createAnimatedBox(middlePos(600, x), middlePos(300, y), name, "nation-title-box", 100, fontSize*1.6, fontSize);
    container.appendChild(infoTextLayout(middlePos(600, x), middlePos(300, y), name, fontSize, "nation-title", CONTEXT_CLASS));

    return container;
}

function createRetrieveHostList(name, x, y, fontSize) {
    /*
     * creates animated boxes for country info and retrieves host list and statistics to be assigned
     * to vue data() in global element tables
     */
    let ip_lines = 100;

    ipdata.hostsByCountryAPI(name).then((ip_dict) => {
        let ipArr = ip_dict['ipArr'];
        if(ipArr.length > 0) {
            let container = createAnimatedBox(x, y+fontSize*2, name, "nation-hosts-box", 90, (ip_lines-5)*fontSize, fontSize);
            retrieveStatInfo(name).then((statArr) => {
                container.appendChild(useTextLayout(x, y + fontSize*1.5, statArr, fontSize-2, STAT_CONTAINER));
                container.appendChild(usePaginationLayout(x + fontSize, y + fontSize*6, fontSize-2, NAV_CONTAINER));
                container.appendChild(useTextLayout(x, y + fontSize*6, ipArr, fontSize-2, HOST_CONTAINER));
            })
        }
    })
    .catch((err) => console.log(err));
}

async function retrieveStatInfo(name, ip_dict) {
    let statArr = [];

    await ipdata.hostsTotalRateAPI(name).then(data => {
        if(data.country_hosts > 0) {
            statArr.push(String(data.country_hosts) + " of " + String(data.total_hosts));
            statArr.push("("  + String(data.country_ratio) + "%)");
            statArr.push("IP addresses:");
        }
    })
    .catch((err) => console.log(err));

    if(statArr.length != STATS_LINES)
        console.log("Error: adjust STATS_LINES to stats content len: " + String(statArr.length));
    else
        return statArr;
}

export function createRetrieveHostDetail(addr, fontSize) {
    let x = 700;
    let y = window.event.clientY * 0.5;
    let boxHeight = 24 * fontSize

    cleanupDetails();

    ipdata.hostByAddrAPI(addr).then(hostData => {
        if(hostData.length > 0) {
            let container = createAnimatedBox(x, y, addr, DETAIL_BOX, 300, boxHeight, fontSize);

            let dArr = [addr, prettyDate(hostData[0]['timestamps'][0]['timestamp']), ""];
            for (const [key, value] of Object.entries(hostData[0]['geoip_detail'])) {
                if(String(value).length > 0)
                    dArr.push(key + " : " + value);
            }
            container.appendChild(createTextLayout(x, y, dArr, fontSize, DETAIL_TEXT));
            if(hostData[0]['host_detail'] && hostData[0]['host_detail']['nmap'].length > 210) {
                container.appendChild(useTextLayout(x, (y+30+dArr.length*fontSize),
                        ["[ open scan details (length "+ hostData[0]['host_detail']['nmap'].length +") ]",],
                        fontSize, DETAIL_CONTAINER));
                document.getElementById(NMAP_ID).setAttribute("addr", addr);
            }
        }
    })
    .catch((err) => console.log(err));
}

export function createRetrieveMoreDetail(addr, fontSize, spanId) {
    const LINE_LENGTH = 85;
    let x = 230;
    let y = 20;

    cleanupScanDetails();

    if(spanId == NMAP_ID) {
        ipdata.hostByAddrAPI(addr).then(hostData => {
            if(hostData.length > 0) {
                let sArr = hostData[0]['host_detail']['nmap'].split("\n");
                sArr[0] = sArr[0].replace("Starting ", "");  // remove confusing first word
                let dArr = splitLineLength(sArr, LINE_LENGTH);
                let height = dArr.length * fontSize * 1.2;
                let container = createAnimatedBox(x, y, addr, NMAP_BOX, LINE_LENGTH*(fontSize*0.6), height, fontSize);
                container.appendChild(createTextLayout(x, y, dArr, fontSize, NMAP_TEXT));
            }
        })
        .catch((err) => console.log(err));
    }
}

function splitLineLength(sArr, limit) {
    let dArr = [];
    sArr.forEach((line) => {
        if(line.length > limit) {
            let words = line.split(" ");
            let nstr = "";
            words.forEach((word) => {
                if((nstr.length + word.length) < limit) {
                    nstr += " " + word;
                }
                else {
                    dArr.push(nstr);
                    nstr = "";
                }
            });
            if(nstr.length) {
                dArr.push(nstr);
            }
        } else {
            dArr.push(line);
        }
    });
    return dArr;
}

function removeId(eid) {
    let elem = document.getElementById(eid);
    if(elem)
        return elem.parentNode.removeChild(elem);
}

function cleanupScanDetails() {
    removeId(NMAP_BOX);
    removeId(NMAP_TEXT);
}

function cleanupDetails() {
    cleanupScanDetails();
    removeId(DETAIL_BOX);
    removeId(DETAIL_TEXT);
    document.getElementById(DETAIL_CONTAINER).style.visibility = "hidden";
}

function prettyDate(timestamp) {
    let end = timestamp.indexOf(".");
    let dateStr = timestamp.slice(0,end);
    return moment(Date.parse(dateStr)).format('lll');
}

export function createTitle() {
    let container = document.getElementById(CONTAINER_ID);
    container.appendChild(infoTextLayout(170, 100, 'tracking brute force cyber attacks', 52, "page-title", "title"));

    ipdata.timestampAPI().then(data => {
        let pretty_date = prettyDate(data.timestamp);
        container.appendChild(infoTextLayout(700, 160, "updated: " + pretty_date, 16, "page-subtitle", "title"));
    })
    .catch((err) => console.log(err));
}

const DOCKED_NAME = 'docked' // the docked-flag's name
const NOTHING_DOCKED = ''

export function classDockUndock(name) {
    if(anythingDocked()) {
        //do undock country class
        let docked = sessionStorage.getItem(DOCKED_NAME)
        sessionStorage.setItem(DOCKED_NAME, NOTHING_DOCKED);
        classReset(docked);
    } else {
        // dock
        sessionStorage.setItem(DOCKED_NAME, name);
    }
}

function anythingDocked() {
    if(sessionStorage.getItem(DOCKED_NAME) == NOTHING_DOCKED)
        return false;
    else
        return true;
}

export function classHighlight(dim, name, transX, transY, fontSize) {
    let country = document.getElementsByClassName(name);

    if(anythingDocked())
        return;

    for(let i = 0; country[i] != null; i += 1) {
        country[i].style.fill = "rgb(200,250,150)";
    }
    /* get mouse coordinates (slightly modificated) */
    let x = (window.event.clientX + transX) * 0.5;
    let y = (window.event.clientY + transY) * 0.5;

    //var pArr = dim.split(" ", 3);
    //console.log(name + " x: " + pArr[1] + " y: " + pArr[2]);
    //console.log("mouse: " + x + " / " +y);

    createNameBox(name, x, y, fontSize);
    createRetrieveHostList(name, 1000, 10, fontSize);
}

export function classReset(name) {
    /*
     * remove animated box elements created by
     * classHighlight()
     */
    let country = document.getElementsByClassName(name);

    if(anythingDocked())
        return;

    for(let x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(140,200,80)";
    }
    let container = document.getElementById("world-map");
    let el = Array.from(document.getElementsByClassName(CONTEXT_CLASS));
    el.forEach(v => {
        container.removeChild(v);
    });

    /*
     * hide global elements containing Vue data() which are re-used by
     * classHighlight()
     */
    document.getElementById(STAT_CONTAINER).style.visibility = "hidden";
    document.getElementById(NAV_CONTAINER).style.visibility = "hidden";
    document.getElementById(HOST_CONTAINER).style.visibility = "hidden";
    document.getElementById(DETAIL_CONTAINER).style.visibility = "hidden";
}

export function initPage() {
    sessionStorage.clear();
    sessionStorage.setItem(DOCKED_NAME, NOTHING_DOCKED);
}

export function preInitHostEntries() {
    let list = [];
    for(let x = 0; x < HOSTS_COUNT; x++) {
        list.push({"id": "host-" + String(x)});
    }
    return list;
}

export function preInitStatEntries() {
    let list = [];
    for(let x = 0; x < STATS_LINES; x++) {
        list.push({"id": "stats-line-" + String(x), "class": "stat-entry"});
    }
    return list;
}

export function preInitPaginEntries() {
    let polygons = [
        {"id": "nav-elem-1", "class": "pagination", "points": "", "dir": "left"},
        {"id": "nav-elem-2", "class": "pagination", "points": "", "dir": "in"},
        {"id": "nav-elem-3", "class": "pagination", "points": "", "dir": "right"},
    ];
    return polygons;
}

