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
    const model = await this.BaseModel.findById(id)
    return model
  }

  async getAll() {
    return this.BaseModel.find()
  }

  async update(id, data) {
    const oldModel = await this.BaseModel.findByIdAndUpdate(id, data)
    return oldModel
  }

  async delete(id) {
    await this.BaseModel.findOneAndRemove({ _id: id })
    const model = await this.BaseModel.findById(id)
    if (!model) {
      return true
    }
    return false
  }

}

module.exports = BaseRepository
