import jsonp from 'common/js/jsonp.js'
import {common, opations} from './config'

export default function getRecommend() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'

  const data = Object.assign({}, common, {
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 1,
    tpl: 'v12',
    page: 'other'
  })
  return jsonp(url, data, opations)
}