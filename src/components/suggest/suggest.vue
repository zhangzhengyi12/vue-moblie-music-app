<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item of result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSuggest } from 'api/search.js'
import { ERR_OK } from 'api/config.js'
import { filterSinger } from 'common/js/song.js'

const TYPE_SINGER = 'singer'
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
  data: function() {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    search() {
      getSuggest(this.query, this.page, this.showSinger).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          console.log(this.result)
        }
      })
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.zhida_singer) {
        ret.push({ ...data.zhida.zhida_singer, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },
    getIconCls(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item) {
      console.log(item)
      return item.type === TYPE_SINGER ? item.singerName : `${item.songname} - ${filterSinger(item.singer)}`
    }
  },
  watch: {
    query() {
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

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
