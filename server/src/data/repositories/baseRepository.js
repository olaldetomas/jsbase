class BaseRepository {

  constructor(Entity) {
    this._entity = Entity
  }

  async create(data) {
    let Model = new this._entity(data)
    return await Model.save()
  }

  async getById(id) {
    const document = await this._entity.findById(id)
    return document
  }

}

module.exports = BaseRepository
