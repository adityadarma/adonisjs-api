import JsonResource from './core/json_resource.js'
import UserResource from './user_resource.js'

export default class RoleResource extends JsonResource {
  toArray(): any {
    return {
      id: this.resource.id,
      name: this.resource.name,
      description: this.resource.description,
      status: this.resource.isActive,
      users: this.mergeWhen(this.resource.users, UserResource.collection(this.resource.users)),
    }
  }
}
