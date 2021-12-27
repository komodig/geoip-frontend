function boxLayout(x, y, name, fontSize) {
    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    var width = 100;

    if ((name.length + 3) * (fontSize/2) > width)
        width = (name.length + 3) * (fontSize/2);

    box.id = "nation-info";
    box.setAttribute("x", x);
    box.setAttribute("y", y);
    box.setAttribute("width", width);
    box.setAttribute("height", fontSize*1.6);
    box.setAttribute("width", width);
    box.setAttribute("height", fontSize*1.6);
    box.setAttribute("fill", "LightGrey");
    box.setAttribute("fill-opacity", 0.5);
    box.setAttribute("stroke-width", 1);
    box.setAttribute("stroke", "black");

    return box;
}

function infoTextLayout(x, y, name, fontSize) {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.id = "nation-text";
    text.setAttribute("x", x + fontSize/2);
    text.setAttribute("y", y + fontSize*1.2);
    text.setAttribute("font-size", fontSize);
    text.innerHTML = name;

    return text;
}

export function classHighlight(name, transX, transY, fontSize) {
    var country = document.getElementsByClassName(name);
    var i;
    for(i = 0; country[i] != null; i += 1) {
        country[i].style.fill = "rgb(60,230,60)";
    }
    var x = (window.event.clientX + transX) * 0.4;
    var y = (window.event.clientY + transY) * 0.4;
    var container = document.getElementById("world-map");
    container.appendChild(boxLayout(x, y, name, fontSize));
    container.appendChild(infoTextLayout(x, y, name, fontSize));
}

export function classReset(name) {
    var country = document.getElementsByClassName(name);
    var x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(40,170,10)";
    }
    var container = document.getElementById("world-map");
    container.removeChild(document.getElementById("nation-info"));
    container.removeChild(document.getElementById("nation-text"));
}
