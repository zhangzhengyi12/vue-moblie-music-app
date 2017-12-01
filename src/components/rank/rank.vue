<template>
  <div class="rank" ref="rank">
    <scroll :data="rankData" ref="scroll" class="toplist">
      <!-- all -->
      <ul>
        <!-- two rank list -->
        <li v-for="rankGroup in rankData">
          <h3 class="toptitle">{{ rankGroup.GroupName }}</h3>
          <ul>
            <!-- rank -->
            <li class="item" v-for="rank in rankGroup.List" @click="selectItem(rank)">
              <div class="icon">
                <img width="100" height="100" :src="rank.pic_v12">
              </div>
              <ul class="songlist">
                <li class="song" v-for="(song,index) in rank.songlist">
                  <span>{{ index + 1 }}. </span>
                  <span>{{ song.songname }} - {{song.singername }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul> 
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRankList } from 'api/rank.js'
import { mapMutations } from 'vuex'
import Scroll from 'base/scroll/scroll.vue'
import { playListMixin } from 'common/js/mixin.js'

export default {
  mixins: [playListMixin],
  created() {
    this._getRank()
  },
  data: function() {
    return {
      rankData: null
    }
  },
  components: {
    Scroll
  },
  methods: {
    _getRank() {
      getRankList().then(res => {
        if (res.length > 0) {
          this.rankData = res
        }
      })
    },
    selectItem(rank) {
      this.$router.push({
        path: `/rank/${rank.ListName}`
      })
      this.setTopList(rank)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.scroll.refresh() // 刷新视口
    }
  },
  watch: {
    rankData() {
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(2)
      }, 30)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .toptitle {
      margin-top: 5px;
      text-align: center;
      color: $color-theme;
      font-size: 18px;
    }

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;

        .song {
          no-wrap();
          line-height: 26px;
        }
      }
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
