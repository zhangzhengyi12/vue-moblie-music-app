import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const MAX_SEARCH_HISTORY = 15
const PLAY_KEY = '__PLAY__'
const MAX_PLAY_HISTORY = 100

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

function delArray(_arr, compare) {
  let arr = _arr.slice()
  const index = arr.findIndex(compare)
  if (index < 0) {
    return arr
  }
  arr.splice(index, 1)
  return arr
}

export function saveSearchLocal(query) {
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

export function deleteSearchLocal(query) {
  let searches = storage.get(SEARCH_KEY, [])
  const newSearches = delArray(searches, item => {
    return item === query
  })
  storage.set(SEARCH_KEY, newSearches)
  return newSearches
}

export function clearSearchLocal() {
  let newSearches = []
  storage.set(SEARCH_KEY, newSearches)
  return newSearches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function savePlayLocal(song) {
  let play = storage.get(PLAY_KEY, [])
  // 避免重复
  const newPlayHistory = insertArray(
    play,
    song,
    item => {
      return item.id === song.id
    },
    MAX_PLAY_HISTORY
  )
  storage.set(PLAY_KEY, newPlayHistory)
  return newPlayHistory
}

export function loadPlayHistory() {
  return storage.get(PLAY_KEY, [])
}
