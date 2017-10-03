<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList.list" ref="scroll">
      <div class="scroll-wrapper">
        <div class="slider-wrapper">
          <slider v-if="slider.length">
            <div v-for="item of slider">
              <a :href="item.GO"><img :src="item.pic" alt="" @load="loadImage"></a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item of discList.list" class="item">
              <div class="icon">
                <img class="needsclick" v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.list">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider.vue'
import Scroll from 'base/scroll/scroll.vue'
import loading from 'base/loading/loading.vue'

export default {
  created() {
    this.$store.dispatch('initRecommendData')
  },
  data: function() {
    return {
      checkLoad: true
    }
  },
  methods: {
    loadImage() {
      if (!this.checkLoad) {
        return
      }
      this.checkLoad = false
      this.$refs.scroll.refresh()
    }
  },
  components: {
    Slider,
    Scroll,
    loading
  },
  computed: {
    slider() {
      return this.$store.state.slider
    },
    discList() {
      return this.$store.state.discList
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
