<template>
  <div class="rank">
    <scroll :data="rankData" ref="scroll">
    <div class="toplist">
      <!-- all -->
      <ul>
        <!-- two rank list -->
        <li v-for="rankGroup in rankData">
          <h3 class="toptitle">{{ rankGroup.GroupName }}</h3>
          <ul>
            <!-- rank -->
            <li class="item" v-for="rank in rankGroup.List">
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
    </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRankList } from 'api/rank.js'
import Scroll from 'base/scroll/scroll.vue'

export default {
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
