import * as types from './mutation-type'
import getJump from 'common/js/goSolider.js'
import { HOT_NAME, HOT_SIZE } from 'api/config.js'
import Singer from 'common/js/singer.js'

const mutations = {
  [types.GET_SLIDER](state) {
    let sData = state.recommendData.focus
    sData.forEach(function(element) {
      element.GO = getJump(element.id, element.type)
    }, this)
    state.slider = sData
  },
  [types.NORMALIZE_SINGERS](state, dataKey) {
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
  [types.SORT_SINGERS](state, dataKey) {
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
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playData.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.playData.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playData.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.playData.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playData.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.playData.currentIndex = index
  },
  [types.SET_DISC](state, item) {
    state.diss = item
  },
  [types.SET_TOP_LIST](state, item) {
    state.topList = item
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  }
}

export default mutations
