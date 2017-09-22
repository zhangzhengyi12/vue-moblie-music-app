import { getSliderConfig } from './config.js'
import ajax from 'common/js/ajax'

const URI = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

export default function getSlider() {
  return ajax(URI, getSliderConfig)
}

