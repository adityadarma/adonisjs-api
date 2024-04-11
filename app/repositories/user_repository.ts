import User from '#models/user'

export default class UserRepository {
  async findById(id: number) {
    return await User.findBy('id', id)
  }

  async findByEmail(email: string) {
    return await User.findBy('email', email)
  }

  async getAll() {
    return await User.all()
  }

  async store(data: any) {
    return await User.create(data)
  }

  async update(user: User, data: any) {
    return await user.merge(data).save()
  }

  async delete(user: User) {
    return await user.delete()
  }

  async createAccessToken(user: User) {
    return await User.accessTokens.create(user)
  }
}
