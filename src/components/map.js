function infoBoxLayout(x, y, name, fontSize) {
    var infoBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    infoBox.id = "nation-info";
    infoBox.setAttribute("x", x);
    infoBox.setAttribute("y", y);

    var width = 100;
    if ((name.length + 2) * (fontSize/2) > width)
        width = (name.length + 2) * (fontSize/2);

    infoBox.setAttribute("width", width);
    infoBox.setAttribute("height", fontSize*1.6);
    infoBox.setAttribute("fill", "LightGrey");
    infoBox.setAttribute("fill-opacity", 0.5);
    infoBox.setAttribute("stroke-width", 3);
    infoBox.setAttribute("stroke", "");

    return infoBox;
}

function infoTextLayout(x, y, name, fontSize) {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.id = "nation-text";
    text.setAttribute("x", x);
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
    var x = (window.event.clientX + transX) * 0.5;
    var y = (window.event.clientY + transY) * 0.5;
    var container = document.getElementById("world-map");
    container.appendChild(infoBoxLayout(x, y, name, fontSize));
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
