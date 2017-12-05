import { ERR_OK } from 'api/config.js'
import { getRecommend, getDiscList } from 'api/recommend.js'
import { getSingerList } from 'api/singer.js'
import * as types from './mutation-type.js'
import { playMode } from 'common/js/config.js'
import { shuffle } from 'common/js/util.js'
import { saveSearch } from 'common/js/cache.js'

const KEY_NAME = 'singerList'

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

const initRecommendData = function({ commit, state }) {
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
}

const initSingerData = function({ commit, state }) {
  getSingerList().then(res => {
    if (res.code === ERR_OK) {
      // normalizi
      state.singerList = res.data.list
      commit(types.NORMALIZE_SINGERS, KEY_NAME)
      commit(types.SORT_SINGERS, KEY_NAME)
    }
  })
}

const selectPlay = function({ commit, state }, { list, index }) {
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
}

const randomPlay = function({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, shuffle(list))
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

const insertSong = function({ commit, state }, song) {
  let playList = state.playData.playList.slice()
  let sequenceList = state.playData.sequenceList.slice()
  let currentIndex = state.playData.currentIndex

  // playList insert
  let currentSong = state.playData.playList[currentIndex]
  currentIndex++ // 注意++ 删除操作依赖
  let fpIndex = findIndex(playList, currentSong)

  playList.splice(currentIndex, 0, song)
  // if need Delete song
  if (fpIndex > -1) {
    if (fpIndex < currentIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  // sequencelist insert
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)
  // if need Delete song
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

const actions = {
  initRecommendData,
  initSingerData,
  randomPlay,
  selectPlay,
  insertSong,
  saveSearchHistory
}

export default actions
