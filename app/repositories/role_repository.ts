import Role from '#models/role'

export default class RoleRepository {
  async findById(id: number) {
    return await Role.findBy('id', id)
  }

  async getAll() {
    return await Role.all()
  }

  async store(data: any) {
    return await Role.create(data)
  }

  async update(role: Role, data: any) {
    return await role.merge(data).save()
  }

  async delete(role: Role) {
    return await role.delete()
  }
}
