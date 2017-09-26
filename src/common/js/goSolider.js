const TYPE_OBJ = {
  10002: 'album',
  10012: 'mv/v',
  3002: false
}

const URI = 'https://y.qq.com/n/yqq/'

export default function paramSliderJump(id, type) {
  let uri = URI
  if (TYPE_OBJ[type]) {
    uri += TYPE_OBJ[type] + '/' + id + '.html'
    return uri
  }
  return id
}