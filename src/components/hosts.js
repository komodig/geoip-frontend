export async function hostsByCountryAPI(country) {
    const url = "https://your-domain/hosts/" + country + "/";
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

export async function hostsTotalRateAPI(country) {
    const url = "https://your-domain/stat/" + country + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data.country_ratio + "% of " + data.total_hosts + " addrs";
}
