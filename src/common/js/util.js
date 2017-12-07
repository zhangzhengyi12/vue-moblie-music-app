export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function delArray(_arr, compare) {
  let arr = _arr.slice()
  const index = arr.findIndex(compare)
  if (index < 0) {
    return arr
  }
  arr.splice(index, 1)
  console.log(arr)
  return arr
}