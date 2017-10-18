import { playMode } from 'common/js/config.js'
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
    mode: playMode,
    currentIndex: -1
  }
}

export default state