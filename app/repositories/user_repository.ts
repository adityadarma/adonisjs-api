import User from '#models/user'
import { ModelQueryBuilder } from '@adonisjs/lucid/orm'

export default class UserRepository {
  async findById(id: number) {
    return await User.findBy('id', id)
  }

  async findByEmail(email: string) {
    return await User.findBy('email', email)
  }

  async queryByIdWithRelation(id: number, relations: Array<string> = []) {
    let query = User.query()
    relations.forEach((relation: any) => {
      query.preload(relation)
    })
    return await query.where('id', id).first()
  }

  async getAll() {
    return await User.all()
  }

  async queryAllWithRelation(relations: Array<string> = []) {
    let query = User.query()
    relations.forEach((relation: any) => {
      query.preload(relation)
    })
    return await query
  }

  async queryAllWithRelationWhere(relations: Array<object> = []) {
    let query = User.query()
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
    return await User.create(data, { client: trx })
  }

  async update(user: User, data: any, trx?: any) {
    user.useTransaction(trx)
    return await user.merge(data).save()
  }

  async delete(user: User, trx?: any) {
    user.useTransaction(trx)
    return await user.delete()
  }

  async createAccessToken(user: User) {
    return await User.accessTokens.create(user)
  }

  async deleteAccessTokenCurrent(user: User, token: number) {
    return User.accessTokens.delete(user, token)
  }
}
