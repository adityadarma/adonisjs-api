import JsonResource from "./core/json_resource.js";
import RoleResource from "./role_resource.js";

export default class UserResource extends JsonResource {
  public toArray(): any {
      return {
        id: this.resource.id,
        name: this.resource.name,
        email: this.resource.email,
        role_id: this.resource.roleId,
        role: this.mergeWhen(this.resource.role, RoleResource.item(this.resource.role)),
      }
  }
}
