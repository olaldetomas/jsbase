const { models, model } = require('mongoose')

class BaseRepository {

  constructor(BaseModel) {
    this.BaseModel = BaseModel
  }

  async create(data) {
    const Model = new this.BaseModel(data)
    const createdModel = await Model.save()
    return createdModel
  }

  async getById(id) {
    const document = await this.BaseModel.findById(id)
    return document
  }

  async getAll() {
    return this.BaseModel.find()
  }

  async delete(id) {
    await this.BaseModel.findOneAndRemove({ _id: id })
    const document = await this.BaseModel.findById(id)
    if (!document) {
      return true
    }
    return false
  }

}

module.exports = BaseRepository
