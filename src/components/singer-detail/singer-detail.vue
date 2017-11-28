<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { getSingerDetail } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song.js'
import musicList from 'components/music-list/music-list.vue'

export default {
  created() {
    this._getDetail()
  },
  components: {
    musicList
  },
  data: function() {
    return {
      songs: []
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
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatarHD
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
