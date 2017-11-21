<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick" >
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
        >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from 'common/js/dom.js'

const transform = prefixStyle('transform')
const BTN_WIDTH = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    _setOffset(offset) {
      this.$refs.progressBtn.style[transform] = `translate3d(${offset}px,0,0)`
      this.$refs.progress.style.width = `${offset}px`
    },
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - BTN_WIDTH
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('precentChange', percent)
    },
    progressClick(e){
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._setOffset(offsetWidth)
      this._triggerPercent()
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) return
      const deltaX = e.touches[0].pageX - this.touch.startX // 触摸偏移距离
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - BTN_WIDTH,
        Math.max(0, this.touch.left + deltaX)
      )
      this._setOffset(offsetWidth)
    }
  },
  watch: {
    percent(newValue) {
      // 不应该单纯的设置百分比，内部组件是不知道外部设置的宽度的
      if (newValue >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - BTN_WIDTH
        const offsetWidth = this.percent * barWidth
        this._setOffset(offsetWidth)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>