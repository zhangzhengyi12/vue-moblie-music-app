export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join('')
}

export function hasClass(el, className) {
  let reg = new RegExp('(\\s|^)' + className + '(\\s|&)') // 因为要和普通标识符拼接，所以用了字符串 需要两次转义
  return reg.test(el.className)
}