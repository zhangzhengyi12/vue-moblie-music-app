<template>
  <div class="singer">
    <listview :data="singers" @selectItem="selectItem"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import Listview from 'base/listview/listview.vue'
import { mapMutations } from 'vuex'

export default {
  data: function() {
    return {
    }
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
  .singer
    position:fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

