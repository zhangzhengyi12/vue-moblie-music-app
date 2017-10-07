import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions.js'
import mutations from './mutations.js'
import state from './state.js'
import * as getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store