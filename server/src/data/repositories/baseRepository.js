class BaseRepository {

  constructor(Entity) {
    this._entity = Entity
  }

  async create(data) {
    let document = new this._entity(data)
    return await document.save()
  }

}

module.exports = BaseRepository
