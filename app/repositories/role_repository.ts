import Role from '#models/role'
import { ModelQueryBuilder } from '@adonisjs/lucid/orm'

export default class RoleRepository {
  async findById(id: number) {
    return await Role.findBy('id', id)
  }

  async getAll() {
    return await Role.all()
  }

  async queryAllWithRelation(relations: Array<string> = []) {
    let query = Role.query()
    relations.forEach((relation: any) => {
      query.preload(relation)
    })
    return await query
  }

  async queryAllWithRelationWhere(relations: Array<object> = []) {
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

  async store(data: any, trx?: any) {
    return await Role.create(data, { client: trx })
  }

  async update(role: Role, data: any, trx?: any) {
    role.useTransaction(trx)
    return await role.merge(data).save()
  }

  async delete(role: Role, trx?: any) {
    role.useTransaction(trx)
    return await role.delete()
  }
}
