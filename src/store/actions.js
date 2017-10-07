import { ERR_OK } from 'api/config.js'
import { getRecommend, getDiscList } from 'api/recommend.js'
import { getSingerList } from 'api/singer.js'
import * as types from './mutation-type.js'

const KEY_NAME = 'singerList'

const actions = {
  initRecommendData({ commit, state }) {
    getRecommend().then(res => {
      if (res.code === ERR_OK) {
        // Distribution of data
        state.recommendData = res.data
        state.hotDiss = res.data.hotdiss
        commit(types.GET_SLIDER)
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
        commit(types.NORMALIZE_SINGERS, KEY_NAME)
        commit(types.SORT_SINGERS, KEY_NAME)
      }
    })
  }
}

export default actions