import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode, PlayModeNameMap } from 'common/js/config.js'
import Confirm from 'base/confirm/confirm.vue'
import Suggest from 'components/suggest/suggest.vue'
import SearchBox from 'base/search-box/search-box.vue'
import Scroll from 'base/scroll/scroll.vue'
import SearchList from 'base/search-list/search-list.vue'

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
    },
    modeText() {
      return PlayModeNameMap[this.mode]
    }
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayState: 'SET_PLAYING_STATE'
    })
  }
}

export const searchMixin = {
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortWrapper.style.bottom = bottom
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.suggest.refresh()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange(newQuery) {
      this.query = newQuery
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    useQuery(item) {
      this.query = item
      this.$refs.searchBox.setQuery(item)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    sureClearHistory() {
      this.$refs.confirm.show()
    },
    ...mapActions(['saveSearchHistory', 'delSearchHistory', 'clearHistory'])
  },
  components: {
    SearchBox,
    Suggest,
    Confirm,
    Scroll,
    SearchList
  }
}
