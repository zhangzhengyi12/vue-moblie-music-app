<template>
  <transition name = 'slide'>
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :isRank="isRank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list.vue'
import { mapGetters } from 'vuex'
import { getTopList } from 'api/rank.js'
import { createSong } from 'common/js/song.js'
export default {
  created() {
    this._getTopList()
  },
  data: function() {
    return {
      topListData: {},
      songs: [],
      isRank: true
    }
  },
  components: {
    MusicList
  },
  methods: {
    _getTopList() {
      if (!this.topList.topID) {
        this.$router.push({
          path: '/rank'
        })
        return
      }
      getTopList(this.topList.topID).then(res => {
        this.songs = this._normalizeTopListData(res.songlist)
      })
    },
    _normalizeTopListData(list) {
      let result = []
      list.forEach(item => {
        // 确保存在歌曲数据
        if (item.data.songmid) {
          result.push(createSong(item.data))
        }
      })
      return result
    }
  },
  computed: {
    ...mapGetters(['topList']),
    title() {
      return this.topList.ListName
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylessheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
