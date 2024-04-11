import RoleResource from '#resources/role_resource'
import RoleService from '#services/role_service'
import { createRoleValidator, messageRoleValidator, updateRoleValidator } from '#validators/role'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}

  async index({ response }: HttpContext) {
    let result = await this.roleService.getAllRole()

    return response.status(result.code).json(result.resource(RoleResource).toJson())
  }

  async store({ request, response }: HttpContext) {
    let data = await request.validateUsing(createRoleValidator, {
      messagesProvider: messageRoleValidator,
    })

    let result = await this.roleService.saveRole(data)

    return response.status(result.code).json(result.toJson())
  }

  async show({ request, response }: HttpContext) {
    const result = await this.roleService.findRoleById(request.params().id)

    return response.status(result.code).json(result.resource(RoleResource).toJson())
  }

  async update({ request, response }: HttpContext) {
    let data = await request.validateUsing(updateRoleValidator, {
      messagesProvider: messageRoleValidator,
      meta: {
        roleId: request.params().id,
      },
    })

    let result = await this.roleService.updateRole(request.params().id, data)

    return response.status(result.code).json(result.toJson())
  }

  async delete({ request, response }: HttpContext) {
    let result = await this.roleService.deleteRole(request.params().id)

    return response.status(result.code).json(result.toJson())
  }
}
