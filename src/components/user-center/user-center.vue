<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="shortcutTab" :currentIndex="shortcutIndex" @switch="switchTab"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random" >
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper" v-show="currentList.length > 0">
        <scroll ref="favoriteList" class="list-scroll" v-if="shortcutIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="shortcutIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="tipsText"></no-result>
      </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Switches from 'base/switches/switches.vue'
import Scroll from 'base/scroll/scroll.vue'
import SongList from 'base/song-list/song-list.vue'
import { mapGetters, mapActions } from 'vuex'
import Song from 'common/js/song.js'
import { playListMixin } from 'common/js/mixin.js'
import NoResult from 'base/no-result/no-result.vue'

export default {
  mixins: [playListMixin],
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    back() {
      this.$router.push({
        path: '/'
      })
    },
    switchTab(index) {
      this.shortcutIndex = index
    },
    ...mapActions(['insertSong', 'randomPlay']),
    selectSong(song) {
      this.insertSong(new Song(song))
    },
    random() {
      let list = this.currentList.map(item => {
        return new Song(item)
      })
      this.randomPlay(list)
    }
  },
  data: function() {
    return {
      shortcutTab: [
        {
          name: '我的喜欢'
        },
        {
          name: '最近播放'
        }
      ],
      shortcutIndex: 0
    }
  },
  computed: {
    currentList() {
      if (this.shortcutIndex === 0) {
        return this.favoriteList
      }
      if (this.shortcutIndex === 1) {
        return this.playHistory
      }
    },
    noResult() {
      console.log(this.currentList)
      if (this.currentList.length > 0) {
        return false
      }
      return true
    },
    tipsText() {
      if (this.shortcutIndex === 1) {
        return '快去收藏歌曲吧'
      }
      return '快去听歌吧'
    },
    ...mapGetters(['favoriteList', 'playHistory'])
  },
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>