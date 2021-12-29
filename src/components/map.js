function boxLayout(x, y, name, boxid, width, height, fontSize) {
    let box = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    if ((name.length + 3) * (fontSize/2) > width)
        box.setAttribute("finalWidth", (name.length + 3) * (fontSize/2));
    else
        box.setAttribute("finalWidth", width);

    box.setAttribute("finalHeight", height);

    box.id = boxid;
    box.setAttribute("x", x);
    box.setAttribute("y", y);
    box.setAttribute("width", 1);
    box.setAttribute("height", 1);
    box.setAttribute("fill", "LightGrey");
    box.setAttribute("fill-opacity", 0.5);
    box.setAttribute("stroke-width", 1);
    box.setAttribute("stroke", "black");

    return box;
}

function infoTextLayout(x, y, name, fontSize) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.id = "nation-text";
    text.setAttribute("x", x + fontSize/2);
    text.setAttribute("y", y + fontSize*1.2);
    text.setAttribute("font-size", fontSize);
    text.innerHTML = name;

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
        country[i].style.fill = "rgb(60,230,60)";
    }
    let x = (window.event.clientX + transX) * 0.4;
    let y = (window.event.clientY + transY) * 0.4;

    var pArr = dim.split(" ", 3);
    console.log(name + " x: " + pArr[1] + " y: " + pArr[2]);
    console.log("mouse: " + x + " / " +y);

    let container = document.getElementById("world-map");
    container.appendChild(boxLayout(x, y, name, "nation-info", 100, fontSize*1.6, fontSize));
    container.appendChild(boxLayout(x, y + fontSize*2, name, "nation-detail", 100, 300, fontSize));

    growBox((progress) => {
        let box = document.getElementById("nation-info");
        box.setAttribute('width', box.getAttribute('finalWidth') * progress);
    });
    growBox((progress) => {
        let box = document.getElementById("nation-info");
        box.setAttribute('height', box.getAttribute('finalHeight') * progress);
    });
    growBox((progress) => {
        let box = document.getElementById("nation-detail");
        box.setAttribute('width', box.getAttribute('finalWidth') * progress);
    });
    growBox((progress) => {
        let box = document.getElementById("nation-detail");
        box.setAttribute('height', box.getAttribute('finalHeight') * progress);
    });

    container.appendChild(infoTextLayout(x, y, name, fontSize));
}

export function classReset(name) {
    let country = document.getElementsByClassName(name);
    let x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(40,170,10)";
    }
    let container = document.getElementById("world-map");
    container.removeChild(document.getElementById("nation-info"));
    container.removeChild(document.getElementById("nation-text"));
    container.removeChild(document.getElementById("nation-detail"));
}
