import UserRepository from '../repositories/user_repository.js'
import { inject } from '@adonisjs/core'
import BaseService from './base_service.js'
import CustomException from '#exceptions/custom_exception'
import SendEmail from '#jobs/send_email'

@inject()
export default class UserService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super()
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan', { status: 404 })
      }

      return this.setCode(200).setMessage('Data user').setData(user)
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async getAllUser() {
    try {
      let users = await this.userRepository.getAll()

      return this.setCode(200).setMessage('Data users').setData(users)
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async saveUser(data: any) {
    try {
      await this.userRepository.store({
        role_id: data.role_id,
        email: data.email,
        name: data.name,
        password: data.password,
      })

      await SendEmail.dispatch({
        email: data.email,
      })

      return this.setCode(201).setMessage('Data user created')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async updateUser(id: number, data: any) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan', { status: 404 })
      }

      await this.userRepository.update(user, {
        email: data.email,
        name: data.name,
      })

      return this.setCode(200).setMessage('Data users updated')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan', { status: 404 })
      }

      await this.userRepository.delete(user)

      return this.setCode(200).setMessage('Data users deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
