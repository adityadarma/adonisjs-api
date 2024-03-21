import User from "#models/user";


export default class UserRepository {
  async findById(id: number) {
    return await User.query().preload('role').where('id', id)
  }

  async getAll() {
    return await User.query().preload('role')
  }

  async store(data: any) {
    return await User.create(data)
  }

  async update(id: number, data: any) {
    return await User.query().where('id', id).update(data)
  }

  async delete(id: number) {
    return await User.query().where('id', id).delete()
  }
}
