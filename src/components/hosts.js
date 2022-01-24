export async function hostsByCountry(name) {
    const url = "https://reeknersprook.de:8080/rsapp/hosts/" + name;
    const response = await fetch(url);
    const data = await response.json();
    let ipArr = [];

    data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            //console.log(`${key} ${value}`);
            if(key == 'ip')
                ipArr.push(value);
        });
    });
    return ipArr;
}
