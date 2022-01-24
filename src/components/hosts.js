export async function hostsByCountryAPI(name) {
    const url = "https://yourdomain/api/path/" + name;
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
