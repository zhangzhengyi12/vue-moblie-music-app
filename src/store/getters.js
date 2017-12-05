export const singer = state => state.singer
export const slider = state => state.slider
export const disclist = state => state.disclist

export const playing = state => state.playData.playing
export const fullScreen = state => state.playData.fullScreen
export const playList = state => state.playData.playList
export const sequenceList = state => state.playData.sequenceList
export const mode = state => state.playData.mode
export const currentIndex = state => state.playData.currentIndex
export const currentSong = state => state.playData.playList[state.playData.currentIndex] || {}

export const disc = state => state.diss

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory