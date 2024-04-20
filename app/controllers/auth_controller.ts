import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'
import {
  loginValidator,
  messageLoginValidator,
  messageRegisterValidator,
  registerValidator,
} from '#validators/auth'
import UserResource from '#resources/user_resource'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator, {
      messagesProvider: messageRegisterValidator,
    })

    const result = await this.authService.registerUser(data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginValidator, {
      messagesProvider: messageLoginValidator,
    })

    const result = await this.authService.loginUser(data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async logout({ response }: HttpContext) {
    const result = await this.authService.logoutUser()

    return response.status(result.getCode()).json(result.toJson())
  }

  async me({ response }: HttpContext) {
    const result = await this.authService.authUser()

    return response.status(result.getCode()).json(result.toJsonResource(UserResource))
  }
}
