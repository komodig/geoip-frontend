const ipdata = require('./hosts.js');
const moment = require('moment');

export const HOSTS_COUNT = 180;
export const NMAP_ID = 'nmap';

const CONTAINER_ID = "world-map"

function boxLayout(x, y, name, boxid, width, height, fontSize) {
    let box = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    // adjust box width if it is too small for name
    if ((name.length + 3) * (fontSize/2) > width)
        box.setAttribute("finalWidth", (name.length + 3) * (fontSize/2));
    else
        box.setAttribute("finalWidth", width);

    box.setAttribute("finalHeight", height);

    box.setAttribute("id", boxid);
    box.setAttribute("class", "nation-context");
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

function longTextLayout(x, y, textArr, fontSize, textId) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("id", textId);
    text.setAttribute("class", "nation-context");
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

function staticTextLayout(x, y, textArr, fontSize, textId) {
    /*
     * re-use static text->tspan (or whatever) elements
     * by filling-in content (i.e. innerHTML) from REST-API
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
    container.appendChild(infoTextLayout(middlePos(600, x), middlePos(300, y), name, fontSize, "nation-title", "nation-context"));

    return container;
}

function createRetrieveHostList(name, x, y, fontSize) {
    let statTextId = "nation-stat-text";

    ipdata.hostsByCountryAPI(name).then((ipArr) => {
        if(ipArr.length > 0) {
            let container = createAnimatedBox(x, y+fontSize*2, name, "nation-hosts-box", 100, (ipArr.length+4)*fontSize, fontSize);
            container.appendChild(longTextLayout(x, y + fontSize*2.5,["...", "from IP addresses:"], fontSize-2, statTextId));
            container.appendChild(staticTextLayout(x, y + fontSize*4, ipArr, fontSize-2, "host-container"));
            createRetrieveStatInfo(name, statTextId);
        }
    })
    .catch((err) => console.log(err));
}

function createRetrieveStatInfo(name, statTextId) {
    ipdata.hostsTotalRateAPI(name).then(data => {
        if(data.country_hosts > 0) {
            let statText = document.getElementById(statTextId);
            statText.firstChild.innerHTML = (data.country_hosts + " of " + data.total_hosts + " ("  + data.country_ratio + "%)");
        }
    })
    .catch((err) => console.log(err));
}

export function createRetrieveHostDetail(addr, fontSize) {
    let x = 700;
    let y = window.event.clientY * 0.5;

    cleanupDetails();

    ipdata.hostByAddrAPI(addr).then(hostData => {
        if(hostData.length > 0) {
            let container = createAnimatedBox(x, y, addr, "host-detail-box", 300, 19*fontSize, fontSize);

            let dArr = [addr, prettyDate(hostData[0]['timestamps'][0]['timestamp']), ""];
            for (const [key, value] of Object.entries(hostData[0]['geoip_detail'])) {
                if(String(value).length > 0)
                    dArr.push(key + " : " + value);
            }
            container.appendChild(longTextLayout(x, y, dArr, fontSize, "host-detail-text"));
            if(hostData[0]['host_detail'] && hostData[0]['host_detail']['nmap'].length > 210) {
                container.appendChild(staticTextLayout(x, (y+30+dArr.length*fontSize),
                        ["[ open scan details (length "+ hostData[0]['host_detail']['nmap'].length +") ]",],
                        fontSize, "link-container"));
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
                let container = createAnimatedBox(x, y, addr, "nmap-detail-box", LINE_LENGTH*(fontSize*0.6), height, fontSize);
                container.appendChild(longTextLayout(x, y, dArr, fontSize, "nmap-detail-text"));
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
    removeId("nmap-detail-box");
    removeId("nmap-detail-text");
}

function cleanupDetails() {
    cleanupScanDetails();
    removeId("host-detail-box");
    removeId("host-detail-text");
    document.getElementById("link-container").style.visibility = "hidden";
}

function prettyDate(timestamp) {
    let end = timestamp.indexOf(".");
    let dateStr = timestamp.slice(0,end);
    return moment(Date.parse(dateStr)).format('lll');
}

export function createTitle() {
    let container = document.getElementById(CONTAINER_ID);
    container.appendChild(infoTextLayout(170, 100, 'tracking brute force cyber attacks', 52, "page-title", "title"));

    ipdata.timestampAPI(1).then(data => {
        let pretty_date = prettyDate(data[0].timestamp);
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
    let country = document.getElementsByClassName(name);

    if(anythingDocked())
        return;

    for(let x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(140,200,80)";
    }
    let container = document.getElementById("world-map");
    let el = Array.from(document.getElementsByClassName("nation-context"));
    el.forEach(v => {
        container.removeChild(v);
    });

    document.getElementById("host-container").style.visibility = "hidden";
    document.getElementById("link-container").style.visibility = "hidden";
}

export function initPage() {
    sessionStorage.clear();
    sessionStorage.setItem(DOCKED_NAME, NOTHING_DOCKED);
}

export function preInitHostEntries(list, range, idPrefix) {
    for(let x = 0; x < range; x++) {
        list.push({"id": idPrefix + "-" + String(x)});
    }
    return list;
}
