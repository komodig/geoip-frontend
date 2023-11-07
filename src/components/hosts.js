const url_path = require('./hosts_config.js').apiURL();

export async function hostsByCountryAPI(country) {
    const url = url_path + "hosts/" + country + "/?page=1";
    const response = await fetch(url);
    let data = await response.json();
    let ip_list = data['results'];
    let count = data['count'];
    let prev = data['previous'];
    let next = data['next'];
    let ipArr = [];
    console.log(`${prev} ---- ${count} ---- ${next}`);

    ip_list.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            //console.log(`${key} ${value}`);
            if(key == "ip")
                ipArr.push(value);
        });
    });

    return {"ipArr": ipArr, "prev": prev, "count": count, "next": next}
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
