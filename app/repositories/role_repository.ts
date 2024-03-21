import Role from "#models/role";

export default class RoleRepository {
  async findById(id: number) {
    return await Role.query().where('id', id).first()
  }

  async getAll() {
    return await Role.all()
  }

  async store(data: any) {
    return await Role.create(data)
  }

  async update(id: number, data: any) {
    return await Role.query().where('id', id).update(data)
  }

  async delete(id: number) {
    return await Role.query().where('id', id).delete()
  }
}
