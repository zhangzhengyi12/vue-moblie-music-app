import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = resolve => {
  import('components/recommend/recommend.vue').then(recommend => {
    resolve(recommend)
  })
}
const UserCenter = resolve => {
  import('components/user-center/user-center.vue').then(userCenter => {
    resolve(userCenter)
  })
}

const Rank = resolve => {
  import('components/rank/rank.vue').then(rank => {
    resolve(rank)
  })
}

const Search = resolve => {
  import('components/search/search.vue').then(search => {
    resolve(search)
  })
}

const Singer = resolve => {
  import('components/singer/singer.vue').then(singer => {
    resolve(singer)
  })
}

const SingerDetail = resolve => {
  import('components/singer-detail/singer-detail.vue').then(singerDetail => {
    resolve(singerDetail)
  })
}

const Dist = resolve => {
  import('components/disc/disc.vue').then(dist => {
    resolve(dist)
  })
}

const TopList = resolve => {
  import('components/toplist/toplist.vue').then(topList => {
    resolve(topList)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/vue-moblie-music-app',
      redirect: 'recommend'
    },
    {
      path: '/user',
      component: UserCenter
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Dist
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    }
  ]
})
