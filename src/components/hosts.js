const url_path = require('./hosts_config.js').apiURL();

export async function hostsByCountryAPI(country) {
    const url = url_path + "hosts/" + country + "/";
    const response = await fetch(url);
    let data = await response.json();
    data = data['results'];
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

export async function hostsTotalRateAPI(country) {
    const url = url_path + "hosts/stat/" + country + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

export async function timestampAPI(limit) {
    const url = url_path + "times/";
    const response = await fetch(url);
    const data = await response.json();

    // only return single (latest) timestamp
    return data['results'][0];
}

export async function hostByAddrAPI(addr) {
    const url = url_path + "hosts/addr/" + addr + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data['results'];

}
