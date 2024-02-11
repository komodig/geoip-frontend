const url_path = require('./hosts_config.js').apiURL();

export async function hostsByCountryAPI(country) {
    const url = url_path + "hosts/" + country + "/?page=1";
    const response = await fetch(url);
    let data = await response.json();
    let ip_list = data;
    let ipArr = [];
    ip_list.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            //console.log(`${key} ${value}`);
            if(key == "ip")
                ipArr.push(value);
        });
    });

    return {"ipArr": ipArr}
}

export async function hostsTotalRateAPI(country) {
    const url = url_path + "hosts/stat/" + country + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

export async function timestampAPI(limit) {
    const url = url_path + "times/" + limit + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data[0];
}

export async function hostByAddrAPI(addr) {
    const url = url_path + "hosts/addr/" + addr + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data;

}
