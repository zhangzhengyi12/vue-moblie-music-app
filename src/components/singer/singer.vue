<template>
  <div class="singer">
    <listview :data="singers"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import Listview from 'base/listview/listview.vue'
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

