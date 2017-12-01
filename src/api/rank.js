import jsonp from 'common/js/jsonp.js'
import { common, opations } from './config'

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

export function getTopList(topId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, common, {
    tpl: 3,
    page: 'detail',
    topid: topId,
    type: 'top',
    song_begin: 0,
    song_num: 100,
    g_tk: 1646224837,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, opations)
}
