export default class Singer {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.avatar =
      'http://y.gtimg.cn/music/photo_new/T001R150x150M000' +
      id +
      '.jpg?max_age=2592000'
    this.avatarHD = 'http://y.gtimg.cn/music/photo_new/T001R800x800M000' +
    id +
    '.jpg?max_age=2592000'
  }
}
