import { common } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = 'http://api.laoliuscript.tk/api/lyric'

  const data = Object.assign({}, common, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 216378378,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}