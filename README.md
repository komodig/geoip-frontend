# optional: install Atom editor
sudo add-apt-repository ppa:webupd8team/atom
sudo apt update
sudo apt install atom

# optional: enable vue syntax for vim
clone https://github.com/posva/vim-vue
into ~/.vim

# install nvm, node.js and vue
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm list-remote
nvm install v16.13.1     # or latest node.js version

# install vue with npm(!)
npm install -g @vue/cli --loglevel verbose      

# if you want to use pug template lang
npm install -g pug
npm install -D pug-plain-loader pug

# create and run frontend sandbox
# if prompted: choose Vue 3!
vue create -n rs-geoip 

cd rs-geoip/src
npm run serve

# create dist/ directory for production:

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
