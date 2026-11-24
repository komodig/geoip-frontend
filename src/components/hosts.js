import { apiURL } from './hosts_config.js';

const url_path = apiURL();

export async function hostsByCountryAPI(country, page = 1) {
    const url = url_path + "hosts/" + country + "/?page=" + page;
    const response = await fetch(url);
    if(!response.ok)
        throw new Error("hostsByCountryAPI: " + country + " page " + page + ": HTTP " + response.status);
    const data = await response.json();
    // paginated response: {count, next, previous, results}
    const ipArr = data.results.map(obj => obj.ip);

    return {"ipArr": ipArr, "page": page, "count": data.count, "next": data.next, "previous": data.previous};
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

export async function hostNewsAPI(count) {
    const url = url_path + "hosts/latest/" + count + "/";
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
