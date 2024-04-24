import RoleResource from '#resources/role_resource'
import RoleService from '#services/role_service'
import { createRoleValidator, messageRoleValidator, updateRoleValidator } from '#validators/role'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RolesController {
  constructor(private roleService: RoleService) {}

  async index({ response }: HttpContext) {
    const result = await this.roleService.getAllRole()

    return response.status(result.getCode()).json(result.toJsonResource(RoleResource))
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator, {
      messagesProvider: messageRoleValidator,
    })

    const result = await this.roleService.saveRole(data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async show({ request, response }: HttpContext) {
    const result = await this.roleService.findRoleById(request.params().id)

    return response.status(result.getCode()).json(result.toJsonResource(RoleResource))
  }

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(updateRoleValidator, {
      messagesProvider: messageRoleValidator,
      meta: {
        id: request.params().id,
      },
    })

    const result = await this.roleService.updateRole(request.params().id, data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async delete({ request, response }: HttpContext) {
    const result = await this.roleService.deleteRole(request.params().id)

    return response.status(result.getCode()).json(result.toJson())
  }
}
