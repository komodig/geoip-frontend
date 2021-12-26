function infoBoxLayout(x, y) {
    var infoBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    infoBox.id = "nation-info";
    infoBox.setAttribute("x", x);
    infoBox.setAttribute("y", y);
    infoBox.setAttribute("width", "60px");
    infoBox.setAttribute("height", "20px");
    infoBox.setAttribute("fill", "LightGrey");
    infoBox.setAttribute("fill-opacity", 0.5);
    infoBox.setAttribute("stroke-width", 3);
    infoBox.setAttribute("stroke", "");

    return infoBox;
}

function infoTextLayout(x, y, name) {
    var fontSize = 11;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.id = "nation-text";
    text.setAttribute("x", x + 5);
    text.setAttribute("y", y + 13);
    text.setAttribute("font-size", fontSize);
    text.innerHTML = name;

    return text;
}

export function classHighlight(name, transX, transY, scale) {
    var country = document.getElementsByClassName(name);
    var i;
    for(i = 0; country[i] != null; i += 1) {
        country[i].style.fill = "rgb(60,230,60)";
    }
    var x = (window.event.clientX + transX) * Math.pow(scale, 2);
    var y = (window.event.clientY + transY) * Math.pow(scale, 2);
    //console.log("x: " + x + " y: " + y + " scale: " + scale);
    var container = document.getElementById("world-map");
    container.appendChild(infoBoxLayout(x, y));
    container.appendChild(infoTextLayout(x, y, name));
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
