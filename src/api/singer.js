import jsonp from 'common/js/jsonp.js'
import { common, opations } from './config'

export function getSingerList() {
  const url = 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign(
    {},
    {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      g_tk: 676345045,
      format: 'jsonp'
    }
  )

  return jsonp(url, data, opations)
}

export function getSingerDetail(singerID) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, common, {
    format: 'jsonp',
    g_tk: 1417350270,
    needNewCode: 0,
    singermid: singerID,
    num: 100
  })

  return jsonp(url, data, opations)
}
