import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank.vue'
import Search from 'components/search/search.vue'
import Recommend from 'components/recommend/recommend.vue'
import Singer from 'components/singer/singer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/singer',
      component: Singer
    }, {
      path: '/rank',
      component: Rank
    }
  ]
})
