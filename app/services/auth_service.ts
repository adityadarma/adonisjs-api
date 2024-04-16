import UnAuthorizedException from '#exceptions/un_authorized_exception'
import UserRepository from '#repositories/user_repository'
import hash from '@adonisjs/core/services/hash'
import BaseService from './base_service.js'
import { inject } from '@adonisjs/core'
import SendEmail from '#jobs/send_email'
import redis from '@adonisjs/redis/services/main'

@inject()
export default class AuthService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super()
  }

  async registerUser(data: any) {
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

      return this.setCode(201).setMessage('Registration successfully')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async loginUser(data: any) {
    try {
      const user = await this.userRepository.findByEmail(data.email)
      if (!user) {
        throw new UnAuthorizedException('Invalid user credentials')
      }

      const isValid = await hash.verify(user.password, data.password)
      if (!isValid) {
        throw new UnAuthorizedException('Invalid user credentials')
      }

      const token = await this.userRepository.createAccessToken(user)
      await redis.set('email', data.email)

      return this.setCode(200).setMessage('Login success').setData(token)
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
