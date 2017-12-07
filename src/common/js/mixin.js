import { mapGetters, mapMutations } from 'vuex'
import { playMode } from 'common/js/config.js'
// import { shuffle } from 'common/js/util.js'
export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('must creat handlePlayList functioin')
    }
  }
}

export const playerMixin = {
  computed: {
    ...mapGetters(['playList', 'currentSong', 'currentIndex', 'mode', 'sequenceList']),
    iconMode() {
      let cName = ''
      Object.keys(playMode).forEach(key => {
        if (playMode[key] === this.mode) {
          cName = `icon-${key}`
        }
      })
      return cName
    }
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayState: 'SET_PLAYING_STATE'
    })
  }
}
