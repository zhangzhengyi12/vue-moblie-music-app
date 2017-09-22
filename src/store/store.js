import Vuex from 'vuex'
import Vue from 'vue'
import getRecommend from 'api/recommend.js'
// import getSlider from 'api/getSlider.js'
import { ERR_OK } from 'api/config.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    slider: []
  },
  mutations: {
    getRecommend(state) {
      getRecommend()
        .then((res) => {
          if (res.code === ERR_OK) {
            state.slider = res.data.focus
          }
        })
    }
    // getSliderList(state) {
    //   getSlider()
    //     .then(res => {
    //       if (res.code === ERR_OK) {
    //         state.sliders === res.data.slider
    //       }
    //     }, e => {
    //       console.log('err')
    //     })
    // }
  }
})

export default store