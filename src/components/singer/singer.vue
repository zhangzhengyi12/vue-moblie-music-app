<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @selectItem="selectItem" ref="listview"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import Listview from 'base/listview/listview.vue'
import { mapMutations } from 'vuex'
import { playListMixin } from 'common/js/mixin.js'

export default {
  mixins: [playListMixin], // 织入组件之中，垫高播放器兼容
  data: function() {
    return {}
  },
  created() {
    this.$store.dispatch('initSingerData')
  },
  computed: {
    singers() {
      return this.$store.state.singerList
    }
  },
  methods: {
    selectItem(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.listview.refresh() // 刷新视口
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Listview
  }
}
</script>

<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>

