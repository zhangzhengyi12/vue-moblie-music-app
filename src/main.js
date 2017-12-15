import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import fastclick from 'fastclick'
import router from './router'
import http from 'vue-resource'
import vueLazyLoad from 'vue-lazyload'
import VConsole from 'vconsole'

/* eslint-disable */
const vconsole = new VConsole()
console.log(vconsole)

Vue.use(http)
Vue.use(vueLazyLoad, {
  loading: require('common/image/default.png')
})

fastclick.attach(document.body)

import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

// HACK PLAY

window.ONCE_FLAG = true