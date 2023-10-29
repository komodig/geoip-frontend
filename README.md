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
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm list-remote
nvm install v16.20.2     # or latest node.js version
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
npm install -g vue-moment --save
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
