import config from '../../config/config'

class BaseRepository {

  constructor(Entity) {
    this._entity = Entity
  }

  async create(entityToCreate) {
    try {
      let result = await this._manager.getRepository(this._entity).save(entityToCreate)
      return result.id
    } catch (error) {
      return error
    }
  }

  async update(id, entityToUpdate, centerId) {
    try {
      let query =  this._manager.createQueryBuilder()
        .update(this._entity)
        .set(entityToUpdate)
        .where('id = :id', { id: id })
      if (centerId) {
        query.andWhere('centerId = :centerId', {centerId: centerId})
      }
      await query.execute()
      let entityUpdated = await this.getById(id)
      return entityUpdated
    } catch (error) {
      return error
    }
  }

  async delete(id, centerId) {
    try {
      let query = this._manager.createQueryBuilder()
        .delete()
        .from(this._entity)
        .where('id = :id', { id: id })
      if (centerId) {
        query.andWhere('centerId = :centerId', {centerId: centerId})
      }
      let result = await query.execute()
      return result
    } catch (error) {
      return error
    }
  }

  //Alta y baja lógica
  async logicalEnable(id, status, centerId) {
    try {
      let query = this._manager.createQueryBuilder()
        .update(this._entity)
        .set({
          isEnabled: status
        })
        .where('id = :id', { id: id })
      if (centerId) {
        query.andWhere('centerId = :centerId', {centerId: centerId})
      }      
      let result = await query.execute()
      return result
    } catch (error) {
      return error
    }
  }

  async getAll(pagination, centerId) {
    try {
      let query = this._manager.getRepository(this._entity)
        .createQueryBuilder()
      if (centerId) {
        query.andWhere('centerId = :centerId', {centerId: centerId})
      }
      //Paginacion//
      query.skip(pagination.startIn)
      query.take(pagination.pageSize)
      //Paginacion//
      let entities= await query.getManyAndCount()
      const result = {
        data: entities[0],
        meta: {
          rowsCount: entities[1]
        }
      }
      return result
    } catch (error) {
      return error
    }
  }

  async getById(id, centerId) {
    try {
      let query = this._manager.getRepository(this._entity)
        .createQueryBuilder('entity')
        .where('entity.id = :id', { id: id })
      if (centerId) {
        query.andWhere('centerId = :centerId', {centerId: centerId})
      }
      let entity = await query.getOne()
      return entity
    } catch (error) {
      return error
    }
  }

}

module.exports = BaseRepository