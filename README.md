# An experimental frontend powered by Vue.js

## 1st clone this repository from github!
```
git clone git://github.com/komodig/geoip-frontend.git
```

## manually create file
## and edit with your path (string) to backend url
```
cp hosts_config.js.example hosts_config.js
```

## optional: enable vue syntax for vim
```
clone https://github.com/posva/vim-vue
```
into ~/.vim

## Install nvm, node.js and vue
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
nvm list-remote
nvm install v24.21.0     # or latest node.js version
```

## Install vue with npm
```
npm install -g @vue/cli --loglevel verbose
```

## If you want to use pug template lang...
```
npm install -g vue-pug-plugin
npm install -D pug-plain-loader pug
npm install -D vue-loader vue-template-compiler
```

## Misc dependencies...
```
npm install --save-dev vite @vitejs/plugin-vue
npm install moment
npm install --global serve
```

## optional: install from scratch
if you don't want to checkout the git repo but
create a new project dir with vue:
(if prompted: choose Vue 3!)
```
vue create -n geoip-frontend
```

## run development server

```
npm run serve
```

## Create dist/ directory for production:

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Functional overview

1. Page header (createTitle, map.js:302)
- Title "tracking brute force cyber attacks" + hint "click country to lock/unlock"
- "updated: <date>" — timestamp of the latest record, from times/1/ (hosts.js:31)

2. The world map itself (world.js — SVG paths for all nations)
- Each country is colored by attack weight: a green gradient scaled by that country's share of all hosts (weightedCountryColor, map.js:369). Higher ratio → more saturated green. Colors are cached in sessionStorage.
- Hover highlights a country pink; click docks/locks the selection so the panel stays put.
- Zoom in/out and pan (the +/− circles and arrow polygons in SvgMap.vue:23-31).

3. On hover/click of a country (classHighlight → createRetrieveHostList, map.js:157)
- An animated box with the country name
- Statistics (hosts/stat/<country>/): hosts in this country vs. total hosts, and the percentage — e.g. 421 of 9,832 / (4.3%)
- A list of attacking IP addresses for that country (hosts/<country>/?page=1), up to 100 entries (HOSTS_COUNT)
- Pagination arrows — rendered, but the handlers are stubs that only console.log (SvgMap.vue:166-175), so paging isn't wired up yet

4. On click of an IP address (createRetrieveHostDetail, map.js:206)
- A detail box with the IP, the last-seen timestamp (formatted via moment), and every non-empty field of the backend's geoip_detail — whatever geolocation attributes the API returns (city/region/ASN/org etc., printed generically as key : value)
- If an nmap scan exists and is longer than 210 chars, a clickable [ open scan details (length N) ] link

5. On click of that link (createRetrieveMoreDetail, map.js:234)
- The full raw nmap scan output for that host, word-wrapped to 85 chars per line, in its own box

Backend endpoints it depends on

hosts/<country>/?page=N, hosts/stat/<country>/, hosts/addr/<ip>/, times/<limit>/ — all in src/components/hosts.js.

