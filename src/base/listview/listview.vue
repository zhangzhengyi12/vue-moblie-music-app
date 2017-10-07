<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
    <ul class="">
      <li v-for="(group,index) of data" class="list-group" ref="listgroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
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
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index" :class="{heightlight:tipsIndex===index}">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="scrollY<=0" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import { getData } from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data: function() {
    return {
      tipsIndex: 0,
      scrollY: -1,
      diff: -1
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
    },
    fixedTitle() {
      if (this.scrollY > 0) return ''
      return this.data[this.tipsIndex] ? this.data[this.tipsIndex].title : ''
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = parseInt(getData(e.target, 'index'))
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.anchorIndex = anchorIndex
      this._scrollTo(this.anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = parseInt(this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = this.anchorIndex + delta
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchEnd() {
      // this.tipsIndex = -1
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (isNaN(index)) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToEle(this.$refs.listgroup[index], 0)
    },
    _calculateHeight() {
      // 本质上是创建一个数组区间
      this.listHeight = []
      const list = this.$refs.listgroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        // 每当列表更新 重新获取高度
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // top
      if (newY > 0) {
        this.tipsIndex = 0
        return
      }

      // mid

      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.tipsIndex = i
          this.diff = height2 + newY
          return
        }
      }

      // bottom
      this.tipsIndex = listHeight.length - 2
    },
    diff(newVal) {
      // newVal是整个固定上边距与下方title的距离
      // 当newVal大于距离会被重置为0 变形回归
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop){
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
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
        padding: 3px 0px 3px 0px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        position: relative
        &.heightlight
          color: $color-theme
        .tips
          display:inline-block
          position: absolute
          height: 24px
          font-size: 22px
          color: $color-theme
          text-align: center
          line-height: 18px
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

