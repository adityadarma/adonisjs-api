import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service';
import { inject } from '@adonisjs/core';

@inject()
export default class AuthController {
  constructor(
    protected authService: AuthService
  ) {}

  async login({request, response}: HttpContext) {
    let result = await this.authService.loginUser(request.only(['email', 'password']))

    return response.status(result.code).json(result.toJson())
  }
}
