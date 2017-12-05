export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  let later = function() {
    let last = Date.now() - timestamp // 获取现在与上一次防抖函数的运行间隔时间

    if (last < wait && last >= 0) {
      // 间隔太小，频率过多，继续延
      timeout = setTimeout(later, wait - last) // wait - last为接下来不触发防抖的期望时间
    } else {
      timeout = null // 间隔够长，运行函数
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(..._args) {
    context = this
    args = _args // 重新赋值，避免重复调用得不到更新
    timestamp = Date.now() // 刷新最新一次调用该防抖函数的时间戳
    let callNow = immediate && !timeout // 是否需要立即调用一次，
    if (!timeout) timeout = setTimeout(later, wait) // 同一时间内只存在一个超时
    if (callNow) {
      // 立即调用一次
      result = func.apply(context, args)
      context = args = null
    }
    // 短时间内触发多次不会调用原函数
    return result
  }
}
