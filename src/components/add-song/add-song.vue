<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box :placeholder="'搜索歌曲'" @query="onQueryChange" ref="searchBox"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="shortcutTab" :currentIndex="shortcutIndex" @switch="switchTab"></switches>
        <div class="list-wrapper">
          <scroll v-if="shortcutIndex===0" :data="playHistory" class="list-scroll" ref="playHistory">
               <div class="list-inner">
            <song-list :songs="playHistory"  :isRank="isRank" @select="gotoPlay"></song-list>
               </div>
          </scroll>
          <scroll class="list-scroll" v-if="shortcutIndex===1" ref="searchHistory" :data="searchHistory">
            <div class="list-inner">
              <search-list :searches="searchHistory" @select="useQuery" @delete="delSearchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" @listScroll="blurInput"  ref="suggest" :showSinger="false" @select="saveSearch" ></suggest>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box.vue'
import Suggest from 'components/suggest/suggest.vue'
import { searchMixin } from 'common/js/mixin.js'
import Switches from 'base/switches/switches.vue'
import { mapGetters, mapActions } from 'vuex'
import SongList from 'base/song-list/song-list.vue'
import Scroll from 'base/scroll/scroll.vue'
import Song from 'common/js/song.js'

export default {
  mixins: [searchMixin],
  data: function() {
    return {
      showFlag: false,
      query: '',
      shortcutTab: [
        {
          name: '最近播放'
        },
        {
          name: '历史搜索'
        }
      ],
      shortcutIndex: 0,
      isRank: false
    }
  },
  computed: {
    ...mapGetters(['playHistory', 'searchHistory'])
  },
  components: {
    SearchBox,
    Suggest,
    Switches,
    SongList,
    Scroll
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    switchTab(index) {
      this.shortcutIndex = index
    },
    gotoPlay(item, index) {
      if (index !== 0) {
        // 取出时必须实例化
        this.insertSong(new Song(item))
      }
    },
    ...mapActions(['insertSong'])
  },
  watch: {
    showFlag() {
      if (this.shortcutIndex === 0) {
        this.$nextTick(() => {
          this.$refs.playHistory.refresh()
        })
      }
      if (this.shortcutIndex === 1) {
        this.$nextTick(() => {
          this.$refs.searchHistory.refresh()
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    position: relative;
    height: 44px;
    text-align: center;

    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }

    .close {
      position: absolute;
      top: 0;
      right: 8px;

      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }

  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;

      .list-scroll {
        height: 100%;
        overflow: hidden;

        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }

  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }

  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;

    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }

    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>