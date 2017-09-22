export const common = {
  g_tk: 1243977605,
  inCharset: 'utf8',
  outCharset: 'GB2312',
  notice: 0,
  fromat: 'jsonp'
}

export const getSliderConfig = {
  fromat: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1
}

export const opations = {
  param: 'jsonpCallback'
}

// 这实质上的callback的key,由jsonp自动帮你加上这个参数并设定其value以便jsonp接收，也就是说他帮你省略了用函数接收的过程，直接传递给你用

export const ERR_OK = 0