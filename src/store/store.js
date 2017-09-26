import Vuex from 'vuex'
import Vue from 'vue'
import getRecommend from 'api/recommend.js'
// import getSlider from 'api/getSlider.js'
import { ERR_OK } from 'api/config.js'
import getJump from 'common/js/goSolider.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recommendData: {},
    slider: []
  },
  mutations: {
    getRecommend(state) {
      getRecommend()
        .then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
            // state.slider = res.data.focus
            state.recommendData = res.data
          }
        })
    },
    getSolider(state) {
      console.log(state.recommendData)
      let sData = state.recommendData.focus
      sData.forEach(function(element) {
        element.GO = getJump(element.id, element.type)
      }, this)
      state.slider = sData
    }
  },
  actions: {
    increment({commit, state}) {
      return new Promise((resolve, reject) => {
        getRecommend()
        .then((res) => {
          if (res.code === ERR_OK) {
            state.recommendData = res.data
            commit('getSolider')
          }
        })
      })
    }
  }
})

export default store