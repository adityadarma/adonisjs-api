import UserRepository from '../repositories/user_repository.js'
import { inject } from '@adonisjs/core'
import BaseService from './base_service.js'
import CustomException from '#exceptions/custom_exception'
import mail from '@adonisjs/mail/services/main'
import VerifyENotification from '#mails/verify_e_notification'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class UserService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super()
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.queryByIdWithRelation(id, ['role'])
      if (!user) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      return this.setData(user).setCode(200).setMessage('Data user')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async getAllUser() {
    try {
      let users = await this.userRepository.queryAllWithRelationWhere([
        {
          'relation': 'role',
          'column': 'id',
          'operator': '=',
          'value': 1
        }
      ])

      return this.setData(users).setCode(200).setMessage('Data users')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async saveUser(data: any) {
    const trx = await db.transaction()
    try {
      const user = await this.userRepository.store({
        role_id: data.role_id,
        email: data.email,
        name: data.name,
        password: data.password,
      }, trx)

      await mail.send(new VerifyENotification(user.email))

      await trx.commit()
      return this.setCode(201).setMessage('Data user created')
    } catch (error) {
      await trx.rollback()
      return this.exceptionCustom(error)
    }
  }

  async updateUser(id: number, data: any) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan', 404)
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
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.userRepository.delete(user)

      return this.setCode(200).setMessage('Data users deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
