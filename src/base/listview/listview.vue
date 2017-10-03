<template>
  <scroll class="listview" :data="data" ref="listview">
    <ul class="">
      <li v-for="(group,index) of data" class="list-group" ref="listgroup" >
        <h2 class="list-group-title":class="{ heightlight : tipsIndex === index}">{{ group.title }}</h2>
        <ul>
          <li v-for="item of group.items" class="list-group-item">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove="onShortcutTouchMove" @touchend="onShortcutTouchEnd">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index">
          {{ item }}
          <span class="tips" v-if="tipsIndex===index">{{item}}</span>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import { getData } from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18

export default {
  created() {
    this.touch = {}
  },
  data: function() {
    return {
      tipsIndex: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = Number(getData(e.target, 'index'))
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.anchorIndex = anchorIndex
      this._scrollTo(this.anchorIndex)
      this.tipsIndex = anchorIndex
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = parseInt(this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = this.anchorIndex + delta
      this._scrollTo(anchorIndex)
      this.tipsIndex = anchorIndex
    },
    onShortcutTouchEnd() {
      this.tipsIndex = -1
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToEle(this.$refs.listgroup[index], 0)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
        &.heightlight
          color: $color-theme
          font-size: $font-size-medium
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 18px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        position: relative
        &.current
          color: $color-theme
        .tips
          display:inline-block
          position: absolute
          height: 24px
          font-size: 22px
          color: $color-theme
          text-align: center
          line-height: 10px
          left: -30px
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

