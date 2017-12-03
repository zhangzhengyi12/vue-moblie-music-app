<template>
  <scroll class="suggest" :pullUp="pullUp" @scrollToEnd="searchMore" ref="scroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item of result" @click="onSelectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
  </scroll>
</template>

<script>
import { getSuggest } from 'api/search.js'
import { ERR_OK } from 'api/config.js'
import { createSong } from 'common/js/song.js'
import Scroll from 'base/scroll/scroll.vue'
import Loading from 'base/loading/loading.vue'
import { debounce } from 'common/js/debounce.js'
import { mapMutations } from 'vuex'
import Singer from 'common/js/singer.js'

const TYPE_SINGER = 'singer'
const PER_PAGE = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Scroll,
    Loading
  },
  data: function() {
    return {
      page: 1,
      result: [],
      pullUp: true,
      hasMore: true
    }
  },
  created() {
    this.search = debounce(this.search, 300, false) // 防抖
  },
  methods: {
    search() {
      getSuggest(this.query, this.page, this.showSinger, PER_PAGE).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data)) // 兼容more
          this.checkHasMore(res.data) // 处理数据并检测是否拥有下一页
        }
      })
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.zhida_singer) {
        ret.push({ ...data.zhida.zhida_singer, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    checkHasMore(data) {
      const song = data.song
      if (!song.list.length || song.curnum + song.curpage * PER_PAGE > song.totalnum) {
        this.hasMore = false
      }
    },
    getIconCls(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item) {
      return item.type === TYPE_SINGER ? item.singerName : `${item.name} - ${item.singer}`
    },
    _reInitTag() {
      this.page = 1
      this.result = []
      this.hasMore = true
    },
    onSelectItem(item) {
      item.type === TYPE_SINGER ? this.goSingerDetail(item) : this.goSongPlay(item)
    },
    goSingerDetail(item) {
      const singer = new Singer(item.singerMID, item.singerName)
      this.$router.push({
        path: `/search/${singer.id}`
      })
      this.setSinger(singer)
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      this.search()
      this.$refs.scroll.refresh()
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    query() {
      // 清除历史
      this._reInitTag()
      this.search()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .nomore {
    font-size: $font-size-medium;
    color: $color-text-d;
    position: absolute;
    bottom: 5px;
    text-align: center;
    width: 100%;
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
