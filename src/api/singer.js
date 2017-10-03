import jsonp from 'common/js/jsonp.js'
import { opations } from './config'

export function getSingerList() {
  const url = 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 676345045,
    format: 'jsonp'
  })

  return jsonp(url, data, opations)
}
