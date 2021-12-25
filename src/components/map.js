export function classHighlight(classid) {
    console.log(classid)
    var country = document.getElementsByClassName(classid);
    var x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(60,230,60)";
    }
}

export function classReset(classid) {
    var country = document.getElementsByClassName(classid);
    var x;
    for(x = 0; country[x] != null; x += 1) {
        country[x].style.fill = "rgb(40,170,10)";
    }
}
