import jsonp from 'common/js/jsonp.js'
import { common, opations } from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, common, {
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, opations)
}

export function getSuggest(query, pageIndex, isCatZhida, n) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

  const data = Object.assign({}, common, {
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    g_tk: 5381,
    p: pageIndex,
    w: query,
    n: n,
    remoteplace: 'txt.yqq.center',
    catZhida: isCatZhida && pageIndex === 1 ? 1 : 0
  })

  return jsonp(url, data, opations)
}
