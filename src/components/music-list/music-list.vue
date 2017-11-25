<template>
  <div class="music-list">

    <div class="fixed-nav">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
    </div>
    <h1 class="title" v-html="title" ref="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bg">
      <div class="play-wrapper" ref="playBtn" v-show="songs.length>0">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text" @click="selectRandom">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter">
      </div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>

  </div>
</template>

<script>
import SongList from 'base/song-list/song-list.vue'
import Scroll from 'base/scroll/scroll.vue'
import Loading from 'base/loading/loading.vue'
import { prefixStyle } from 'common/js/dom.js'
import { mapActions } from 'vuex'
import { playListMixin } from 'common/js/mixin.js'

const transformName = prefixStyle('transform')
const backdropFilterName = prefixStyle('backdrop-filter')

export default {
  mixins: [playListMixin],
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  data: function() {
    return {
      scrollY: 0
    }
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    selectRandom() {
      this.randomPlay({
        list: this.songs
      })
    },
    handlePlayList(playList){
      // 这个回调放到mixin里
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    ...mapActions(['selectPlay', 'randomPlay'])
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  mounted() {
    this.imgHeight = this.$refs.bg.clientHeight
    this.titleHeight = this.$refs.title.clientHeight
    this.minTranslateY = -this.imgHeight + this.titleHeight
    this.$refs.list.$el.style.top = this.$refs.bg.clientHeight + 'px'
  },
  watch: {
    scrollY(newY) {
      let zIndex = 0
      let scale = 1
      let blur = 0
      let playBoxDis = 'block'
      let translateY = Math.max(this.minTranslateY, newY)
      // 计算遮罩动画
      if (translateY === this.minTranslateY) {
        zIndex = 10
        this.$refs.bg.style.paddingTop = 0
        this.$refs.bg.style.height = `${this.titleHeight}px`
        playBoxDis = 'none'
      } else {
        // 如果不再顶端 让bg-layer自动遮罩回去即可，不需要修改背景图的其他属性
        this.$refs.bg.style.paddingTop = `70%`
        this.$refs.bg.style.height = `0px`
      }
      //  计算下拉缩放 && 模糊
      const percent = Math.abs(newY / this.imgHeight)
      if (newY > 0) {
        scale += percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }

      this.$refs.filter.style[backdropFilterName] = `blur(${blur}px)`
      this.$refs.filter.style[backdropFilterName] = `blur(${blur}px)`

      this.$refs.bg.style.zIndex = zIndex
      this.$refs.bgLayer.style[transformName] = `translate3d(0,${translateY}px,0)`
      this.$refs.bg.style[transformName] = `scale(${scale})`

      this.$refs.playBtn.style.display = playBoxDis
    }
  },
  components: {
    SongList,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>