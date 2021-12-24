# An experimental frontend powered by Vue.js

## 1st clone this repository from github!
```
git clone git://github.com/komodig/geoip-frontend.git
```

## optional: enable vue syntax for vim
clone https://github.com/posva/vim-vue
into ~/.vim

## Install nvm, node.js and vue
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm list-remote
nvm install v16.13.1     # or latest node.js version
```

## Install vue with npm
```
npm install -g @vue/cli --loglevel verbose
```

## If you want to use pug template lang...
```
npm install -g pug
npm install -D pug-plain-loader pug
```

## optianal: install from scratch
if you don't want to checkout the git repo but
create a new project dir with vue:
(if prompted: choose Vue 3!)
```
vue create -n geoip-frontend
```

```
cd geoip-frontend/src
npm run serve
```

# Create dist/ directory for production:

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
