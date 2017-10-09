import * as types from './mutation-type'
import getJump from 'common/js/goSolider.js'
import { HOT_NAME, HOT_SIZE } from 'api/config.js'
import Singer from 'common/js/singer.js'

const mutations = {
  // [types.SET_SINGER](state, singer) {},
  [types.GET_SLIDER](state) {
    let sData = state.recommendData.focus
    sData.forEach(function(element) {
      element.GO = getJump(element.id, element.type)
    }, this)
    console.log(sData)
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
  }
}

export default mutations
