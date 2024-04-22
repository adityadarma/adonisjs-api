import JsonResource from './core/json_resource.js'
import RoleResource from './role_resource.js'

export default class UserResource extends JsonResource {
  toArray(): any {
    return {
      id: this.resource.id,
      name: this.resource.name,
      email: this.resource.email,
      role_id: this.resource.roleId,
      role: this.mergeResourceWhen(this.resource.role, RoleResource),
    }
  }
}
