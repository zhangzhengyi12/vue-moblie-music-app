import Vue from 'vue'
import Router from 'vue-router'
import userCenter from 'components/user-center/user-center.vue'
import Rank from 'components/rank/rank.vue'
import Search from 'components/search/search.vue'
import Recommend from 'components/recommend/recommend.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'
import Dist from 'components/disc/disc.vue'
import TopList from 'components/toplist/toplist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/user',
      component: userCenter
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
