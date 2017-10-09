<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import { getSingerDetail } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import { mapGetters } from 'vuex'

export default {
  created() {
    this._getDetail()
  },
  data: function() {
    return {
      detailData: {}
    }
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push({
          path: '/singer'
        })
      }
      getSingerDetail(this.singer.id)
        .then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
          }
        })
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  }
}
</script>


<style lang="stylus" scoped>

@import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index : 100
    top: 0
    left :0
    right: 0
    bottom: 0
    background :$color-background
  
  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter,.slide-leave-to
    transform : translate3d(100%,0,0)


</style>
