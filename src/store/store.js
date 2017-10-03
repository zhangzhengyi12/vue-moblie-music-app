import Vuex from 'vuex'
import Vue from 'vue'
import { getRecommend, getDiscList } from 'api/recommend.js'
import { ERR_OK, HOT_NAME, HOT_SIZE } from 'api/config.js'
import { getSingerList } from 'api/singer.js'
import getJump from 'common/js/goSolider.js'
import Singer from 'common/js/singer.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recommendData: {},
    slider: [],
    discList: {},
    singerList: []
  },
  mutations: {
    getSlider(state) {
      let sData = state.recommendData.focus
      sData.forEach(function(element) {
        element.GO = getJump(element.id, element.type)
      }, this)
      state.slider = sData
    },
    normalizeSingers(state, dataKey) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      state[dataKey].forEach((item, index) => {
        if (index < HOT_SIZE) {
          map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      state[dataKey] = map
    },
    sortSingers(state, dataKey) {
      let hot = []
      let ret = []

      for (let key in state[dataKey]) {
        let val = state[dataKey][key]
        if (val.title.match(/[a-zA-z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      state[dataKey] = hot.concat(ret)
    }
  },
  actions: {
    initRecommendData({ commit, state }) {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          // Distribution of data
          state.recommendData = res.data
          state.hotDiss = res.data.hotdiss
          commit('getSlider')
        }
      })

      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          state.discList = res.data
        }
      })
    },
    initSingerData({ commit, state }) {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          // normalizi
          state.singerList = res.data.list
          commit('normalizeSingers', 'singerList')
          commit('sortSingers', 'singerList')
          console.log(state.singerList)
        }
      })
    }
  }
})

export default store
