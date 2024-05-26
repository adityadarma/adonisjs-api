import Role, { RoleAttribute } from '#models/role'
import { ModelQueryBuilder } from '@adonisjs/lucid/orm'

export default class RoleRepository {
  async findById(id: number) {
    return await Role.findBy('id', id)
  }

  async getAll() {
    return await Role.all()
  }

  async queryAllWithRelation(relations: string[] = []) {
    let query = Role.query()
    relations.forEach((relation: any) => {
      query.preload(relation)
    })
    return await query
  }

  async queryAllWithRelationWhere(relations: object[] = []) {
    let query = Role.query()
    relations.forEach((relation: any) => {
      query.preload(
        relation.relation,
        (query: ModelQueryBuilder) => {
          query.where(relation.column, relation.operator, relation.value)
        }
      )
    })
    return await query
  }

  async store(data: RoleAttribute, trx?: any) {
    return await Role.create(data, { client: trx })
  }

  async update(model: Role, data: any, trx?: any) {
    model.useTransaction(trx)
    return await model.merge(data).save()
  }

  async delete(model: Role, trx?: any) {
    model.useTransaction(trx)
    return await model.delete()
  }
}
