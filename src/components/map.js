export function classHighlight(classid, dim) {
    console.log(classid);
    var country = document.getElementsByClassName(classid);
    var x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(60,230,60)";
    }
    var infoBox = document.createElement("rect");
    infoBox.id = "nation-info";
    var pArr = dim.split(" ", 3);
    console.log("x: " + pArr[1] + " y: " + pArr[2]);
    infoBox.setAttribute("x", pArr[1]);
    infoBox.setAttribute("y", pArr[2]);
    infoBox.setAttribute("width", "60px");
    infoBox.setAttribute("height", "20px");
    infoBox.setAttribute("border-radius", "6px");
    infoBox.setAttribute("background", "yellow");
    document.getElementById("world-map").appendChild(infoBox);
}

export function classReset(classid) {
    var country = document.getElementsByClassName(classid);
    var x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(40,170,10)";
    }
    //var infoBox = document.getElementById("nation-info");
    //var container = document.getElementById("world-map").removeChild(infoBox);
}
