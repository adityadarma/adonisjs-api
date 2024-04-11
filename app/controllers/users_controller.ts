import UserResource from '#resources/user_resource'
import UserService from '#services/user_service'
import { createUserValidator, messageUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async index({ response }: HttpContext) {
    let result = await this.userService.getAllUser()

    return response.status(result.code).json(result.resource(UserResource).toJson())
  }

  async store({ request, response }: HttpContext) {
    let data = await request.validateUsing(createUserValidator, {
      messagesProvider: messageUserValidator,
    })

    let result = await this.userService.saveUser(data)

    return response.status(result.code).json(result.toJson())
  }

  async show({ request, response }: HttpContext) {
    const result = await this.userService.findUserById(request.params().id)

    return response.status(result.code).json(result.resource(UserResource).toJson())
  }

  async update({ request, response }: HttpContext) {
    let data = await request.validateUsing(createUserValidator, {
      messagesProvider: messageUserValidator,
      meta: {
        userId: request.params().id,
      },
    })

    let result = await this.userService.updateUser(request.params().id, data)

    return response.status(result.code).json(result.toJson())
  }

  async delete({ request, response }: HttpContext) {
    let result = await this.userService.deleteUser(request.params().id)

    return response.status(result.code).json(result.toJson())
  }
}
