import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import fastclick from 'fastclick'
import router from './router'
import http from 'vue-resource'

Vue.use(http)

fastclick.attach(document.body)

import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})