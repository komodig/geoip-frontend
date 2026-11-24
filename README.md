# An experimental frontend powered by Vue.js

Interactive SVG world map visualising brute-force attack sources, backed by a GeoIP REST API.
Built with **Vue 3** and **Vite**.

## 1st clone this repository from github!
```
git clone git://github.com/komodig/geoip-frontend.git
```

## manually create file with your path (string) to backend url
```
cp hosts_config.js.example hosts_config.js
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

### Build and deploy to the artifacts repo
`build_deploy.sh` runs `npm run build`, copies `dist/*` into a sibling checkout
`../rs-frontend/dist/` and commits + pushes it there:
```
./build_deploy.sh
```

### Customize configuration
See the [Vite config reference](https://vite.dev/config/). The whole build is
configured in `vite.config.js`; there is no webpack or Vue CLI setup any more.

### Functional overview

1. Page header (createTitle, map.js:381)
- Title "incoming cyber attacks detected" + hint "click country on map to query detail"
- "updated: <date>" — timestamp of the latest record, from times/1/ (hosts.js:25)
- Host news: the 10 latest hosts (hosts/latest/10/), stacked below the timestamp, fading in one after another with decreasing opacity towards the end of the list
- Title, timestamp and host news fade out while a country is docked and come back when it is released

2. The world map itself (world.js — SVG paths for all nations)
- Each country is colored by attack weight: a green gradient scaled by that country's share of all hosts (weightedCountryColor, map.js:571). Higher ratio → more saturated green. Colors are cached in sessionStorage.
- Hover highlights a country violet.

3. Docking (locking) a country
- Click a country to dock it. The world fades to violet, the docked country turns white, and once the fade is over (FOCUS_FADE_MS) the map zooms in on the country's center.
- While docked, clicks on other countries and hovering are ignored — the panel stays put.
- Undock only with the (x) button in the top right corner (SvgMap.vue:33-35); it is only visible while a country is docked. Undocking restores the previous zoom/pan view.

4. On hover/click of a country (classHighlight → createRetrieveHostList, map.js:209)
- An animated box with the country name
- Statistics (hosts/stat/<country>/): hosts in this country vs. total hosts, and the percentage — e.g. 421 of 9,832 / (4.3%)
- A list of attacking IP addresses for that country, one page of hosts/<country>/?page=N (page size set by the backend)

5. Pagination of the host list (pagemove, SvgMap.vue:274 → retrieveHostPage, map.js:235)
- Only usable while a country is docked
- Left/right arrows load the previous/next page (disabled when the backend reports no previous/next page)
- The middle button returns to page 1
- Hovering a new country always starts at page 1

6. On click of an IP address (createRetrieveHostDetail, map.js:282)
- A detail box with the IP, the last-seen timestamp (formatted via moment), and every non-empty field of the backend's geoip_detail — whatever geolocation attributes the API returns (city/region/ASN/org etc., printed generically as key : value)
- If an nmap scan exists and is longer than 210 chars (SCAN_MIN_LENGTH), a clickable [ open scan details (length N) ] link

7. On click of that link (createRetrieveMoreDetail, map.js:310)
- The full raw nmap scan output for that host, word-wrapped to 85 chars per line, in its own box

Backend endpoints it depends on

hosts/<country>/?page=N (paginated: `{count, next, previous, results}`), hosts/stat/<country>/, hosts/addr/<ip>/, hosts/latest/<count>/, times/<limit>/ — all in src/components/hosts.js.
