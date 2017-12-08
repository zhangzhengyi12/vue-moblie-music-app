import { playMode } from 'common/js/config.js'
import { loadSearch, loadPlayHistory } from 'common/js/cache.js'
const state = {
  singer: {},
  recommendData: {},
  slider: [],
  discList: {},
  singerList: [],
  playData: {
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
  },
  diss: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlayHistory()
}

export default state
