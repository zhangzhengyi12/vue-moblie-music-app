export function routerBack(path) {
  let regx = /()\/\w$/
  let matchs = path.match(regx)
  return matchs[1]
}
