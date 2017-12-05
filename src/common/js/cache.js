import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const MAX_SEARCH_HISTORY = 15

function insertArray(_arr, val, compare, maxlen) {
  let arr = _arr.slice()
  const index = arr.findIndex(compare)
  if (index === 0) {
    return arr
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    console.log('pop')
    arr.pop()
  }

  return arr
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  const newSearches = insertArray(
    searches,
    query,
    item => {
      return item === query
    },
    MAX_SEARCH_HISTORY
  )

  storage.set(SEARCH_KEY, newSearches)
  return newSearches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
