import jsonp from 'common/js/jsonp.js'
import { common, opations } from './config'
import axios from 'axios'

export function getRecommend() {
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

export function getDiscList() {
  const url = 'http://api.laoliuscript.tk/api/getDiscList'

  const data = Object.assign({}, common, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDissData(dissId) {
  const url = 'http://api.laoliuscript.tk/api/getDissData'

  const data = Object.assign({}, common, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: dissId,
    format: 'jsonp',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
