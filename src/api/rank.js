import jsonp from 'common/js/jsonp.js'
import { common } from './config'

export function getRankList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg'

  // page=index&format=html&tpl=macv4&v8debug=1&jsonCallback=jsonCallback

  const data = Object.assign({}, common, {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  })
  return jsonp(url, data, {
    name: 'jsonCallback'
  })
}
