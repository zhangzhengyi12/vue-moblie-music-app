var express = require('express')
var app = express()
var axios = require('axios')

var port = process.env.PORT || 8080

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/getDissData', (req, res) => {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'http://y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      var ret = response.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^]+})\)$/
        var mathes = ret.match(reg)
        if (mathes) {
          ret = JSON.parse(mathes[1])
        }
      }
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/lyric', (req, res) => {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'http://c.y.qq.com',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      var ret = response.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var mathes = ret.match(reg)
        if (mathes) {
          ret = JSON.parse(mathes[1])
        }
      }
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})

app.use('/api', apiRoutes)
app.use(express.static('./dist/'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
  }
})

console.log('server is listening to  port ....', port)
