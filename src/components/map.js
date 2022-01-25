let ipdata = require('./hosts.js');

function boxLayout(x, y, name, boxid, width, height, fontSize) {
    let box = document.createElementNS("http://www.w3.org/2000/svg", "rect");

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

function infoTextLayout(x, y, name, fontSize, textId) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("id", textId);
    text.setAttribute("class", "nation-context");
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

function growBox(action_callback) {
    /* animated box expanding */
    let startTime = 0;
    const totalTime = 200;
    // nested function
    const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        // progress from 0 to 1 over totalTime
        const progress = (timestamp - startTime) / totalTime;
        action_callback(progress);
        if (progress < 1) {
            window.requestAnimationFrame(animateStep);
        }
    }
    window.requestAnimationFrame(animateStep);
}

export function classHighlight(dim, name, transX, transY, fontSize) {
    let country = document.getElementsByClassName(name);
    let i;
    for(i = 0; country[i] != null; i += 1) {
        country[i].style.fill = "rgb(200,250,150)";
    }
    /* get mouse coordinates (slightly modificated) */
    let x = (window.event.clientX + transX) * 0.4;
    let y = (window.event.clientY + transY) * 0.4;

    var pArr = dim.split(" ", 3);
    console.log(name + " x: " + pArr[1] + " y: " + pArr[2]);
    console.log("mouse: " + x + " / " +y);

    let container = createNameBox(name, x, y, fontSize);
    createRetrieveHostInfo(container, name, x, y, fontSize);
}

function createNameBox(name, x, y, fontSize) {
    var container = document.getElementById("world-map");
    container.appendChild(boxLayout(x, y, name, "nation-info", 100, fontSize*1.6, fontSize));

    growBox((progress) => {
        let box = document.getElementById("nation-info");
        box.setAttribute('width', box.getAttribute('finalWidth') * progress);
    });
    growBox((progress) => {
        let box = document.getElementById("nation-info");
        box.setAttribute('height', box.getAttribute('finalHeight') * progress);
    });
    container.appendChild(infoTextLayout(x, y, name, fontSize, "nation-text"));

    return container;
}

function createRetrieveHostInfo(container, name, x, y, fontSize) {
    let statTextId = "nation-stat-text";

    ipdata.hostsByCountryAPI(name).then(ipArr => {
        if(ipArr.length > 0) {
            container.appendChild(boxLayout(x, y + fontSize*2, name, "nation-detail", 100, (ipArr.length + 2) * fontSize*1.6, fontSize));
            growBox((progress) => {
                let box = document.getElementById("nation-detail");
                box.setAttribute('width', box.getAttribute('finalWidth') * progress);
            });
            growBox((progress) => {
                let box = document.getElementById("nation-detail");
                box.setAttribute('height', box.getAttribute('finalHeight') * progress);
            });

            container.appendChild(longTextLayout(x, y + fontSize*2.5,["...", "from IP addresses:"] , fontSize-2, statTextId));
            container.appendChild(longTextLayout(x, y + fontSize*5, ipArr, fontSize-2, "nation-long-text"));

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
            console.log(data.country_hosts + " ("  + data.country_ratio + "%) of " + data.total_hosts);
        }
    })
    .catch((err) => console.log(err));
}

export function createTitle() {
    let container = document.getElementById("world-map");
    container.appendChild(infoTextLayout(170, 100, 'tracking brute force cyber attacks', 52, "page-title"));
}

export function classReset(name) {
    let country = document.getElementsByClassName(name);
    let x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(140,200,80)";
    }
    let container = document.getElementById("world-map");
    let el = Array.from(document.getElementsByClassName("nation-context"));
    el.forEach(v => {
        container.removeChild(v);
    });
}
