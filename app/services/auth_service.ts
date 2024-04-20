import UnAuthorizedException from '#exceptions/un_authorized_exception'
import UserRepository from '#repositories/user_repository'
import hash from '@adonisjs/core/services/hash'
import BaseService from './base_service.js'
import { inject } from '@adonisjs/core'
import SendEmailVerify from '#jobs/send_email_verify'
import redis from '@adonisjs/redis/services/main'
import Auth from '../utilities/auth.js'

@inject()
export default class AuthService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super()
  }

  async registerUser(data: any) {
    try {
      const user = await this.userRepository.store({
        role_id: data.role_id,
        email: data.email,
        name: data.name,
        password: data.password,
      })

      await SendEmailVerify.dispatch({
        user: user,
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

      return this.setData(token).setCode(200).setMessage('Login success')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async logoutUser() {
    try {
      const user = await Auth.user()

      // @ts-ignore
      await this.userRepository.deleteAccessTokenCurrent(user, user?.currentAccessToken.identifier)

      return this.setCode(200).setMessage('Logout success')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async authUser() {
    try {
      const user = await Auth.user()

      return this.setData(user).setCode(200).setMessage('User authenticated')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
