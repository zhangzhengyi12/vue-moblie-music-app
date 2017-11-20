import { ERR_OK } from 'api/config.js'
import { getRecommend, getDiscList } from 'api/recommend.js'
import { getSingerList } from 'api/singer.js'
import * as types from './mutation-type.js'
import { playMode } from 'common/js/config.js'
import { shuffle } from 'common/js/util.js'

const KEY_NAME = 'singerList'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

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
  },
  selectPlay({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.playData.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
      console.log(index)
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  randomPlay({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, shuffle(list))
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  }
}

export default actions