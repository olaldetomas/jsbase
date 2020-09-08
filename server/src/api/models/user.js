class UserModel {

  constructor(entity) {
    this.id = entity.id
    this.firstName = entity.firstName
    this.lastName = entity.lastName
    this.rol = entity.rol
    this.createdAt = entity.createdAt
    this.email = entity.email
    this.centerId = entity.centerId
  }

}

module.exports = {
  UserModel: UserModel
}