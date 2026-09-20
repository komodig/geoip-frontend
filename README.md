# An experimental frontend powered by Vue.js

Interactive SVG world map visualising brute-force attack sources, backed by a GeoIP REST API.
Built with **Vue 3** and **Vite**.

## 1st clone this repository from github!
```
git clone git://github.com/komodig/geoip-frontend.git
```

## manually create file
## and edit with your path (string) to backend url
```
cp src/components/hosts_config.js.example src/components/hosts_config.js
```

## Install nvm and node.js
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
nvm list-remote
nvm install v24.21.0     # or latest node.js version
```

## Install dependencies
Everything needed (Vue, Vite, pug, moment) is declared in `package.json`:
```
npm install
```

## optional: enable vue syntax for vim
```
clone https://github.com/posva/vim-vue
```
into ~/.vim

## run development server
Starts Vite with hot module replacement on http://localhost:5173/
```
npm run dev
```

## Create dist/ directory for production:

### Compiles and minifies for production
```
npm run build
```

### Serve the production build locally
Requires `npm install --global serve`:
```
npm run serve
```

### Customize configuration
See the [Vite config reference](https://vite.dev/config/). The whole build is
configured in `vite.config.js`; there is no webpack or Vue CLI setup any more.

### Functional overview

1. Page header (createTitle, map.js:305)
- Title "tracking brute force cyber attacks" + hint "click country to lock/unlock"
- "updated: <date>" — timestamp of the latest record, from times/1/ (hosts.js:30)

2. The world map itself (world.js — SVG paths for all nations)
- Each country is colored by attack weight: a green gradient scaled by that country's share of all hosts (weightedCountryColor, map.js:394). Higher ratio → more saturated green. Colors are cached in sessionStorage.
- Hover highlights a country pink; click docks/locks the selection so the panel stays put.
- Zoom in/out and pan (the +/− circles and arrow polygons in SvgMap.vue:23-31).

3. On hover/click of a country (classHighlight → createRetrieveHostList, map.js:169)
- An animated box with the country name
- Statistics (hosts/stat/<country>/): hosts in this country vs. total hosts, and the percentage — e.g. 421 of 9,832 / (4.3%)
- A list of attacking IP addresses for that country (hosts/<country>/?page=1), up to 100 entries (HOSTS_COUNT)
- Pagination arrows — rendered, but the handlers are stubs that only console.log (SvgMap.vue:167-176), so paging isn't wired up yet

4. On click of an IP address (createRetrieveHostDetail, map.js:206)
- A detail box with the IP, the last-seen timestamp (formatted via moment), and every non-empty field of the backend's geoip_detail — whatever geolocation attributes the API returns (city/region/ASN/org etc., printed generically as key : value)
- If an nmap scan exists and is longer than 210 chars (SCAN_MIN_LENGTH), a clickable [ open scan details (length N) ] link

5. On click of that link (createRetrieveMoreDetail, map.js:234)
- The full raw nmap scan output for that host, word-wrapped to 85 chars per line, in its own box

Backend endpoints it depends on

hosts/<country>/?page=N, hosts/stat/<country>/, hosts/addr/<ip>/, times/<limit>/ — all in src/components/hosts.js.
