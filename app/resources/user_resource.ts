import JsonResource from "./json_resource.js";
import RoleResource from "./role_resource.js";

export default class UserResource extends JsonResource {
  public toArray(): any {
      return {
        id: this.resource.id,
        name: this.resource.name,
        email: this.resource.email,
        role_id: this.resource.roleId,
        role: RoleResource.item(this.resource.role),
      }
  }
}
