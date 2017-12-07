<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <!-- 当query存在 隐藏热门搜索 -->
    <div class="shortcut-wrapper" v-show="!query" ref="shortWrapper"> 
      <scroll class="shortcut" :data="shortcut" ref="shortcut">
        <div>
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li v-for="key in hotKey" class="item" @click="addQuery(key.k)">
              <span>{{ key.k }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length>0">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="sureClearHistory">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list :searches="searchHistory" @select="useQuery" @delete="delSearchHistory"></search-list>
        </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest" ></suggest>
    </div>
    <confirm ref="confirm" :text="'确定要清空搜索历史吗'" @confirm="clearHistory" :confirmBtnText="'清空'"></confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import SearchBox from 'base/search-box/search-box.vue'
import { getHotKey } from 'api/search.js'
import { ERR_OK } from 'api/config.js'
import { mapActions, mapGetters } from 'vuex'
import Suggest from 'components/suggest/suggest.vue'
import SearchList from 'base/search-list/search-list.vue'
import { playListMixin } from 'common/js/mixin.js'
import Confirm from 'base/confirm/confirm.vue'
import Scroll from 'base/scroll/scroll.vue'
export default {
  mixins: [playListMixin],
  created() {
    this._getHotKey()
  },
  data: function() {
    return {
      hotKey: [],
      query: ''
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  computed: {
    ...mapGetters(['searchHistory']),
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.shortWrapper.style.bottom = bottom
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.suggest.refresh()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (ERR_OK === res.code) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
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
  watch: {
    query(newQuery) {
      if (!newQuery) {
        // 解决DOM冲突 避免历史滚动无法触发。
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>