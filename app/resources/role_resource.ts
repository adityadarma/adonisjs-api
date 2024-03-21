import JsonResource from "./json_resource.js";

export default class RoleResource extends JsonResource {
  public toArray(): any {
      return {
        id: this.resource.id,
        name: this.resource.name,
        description: this.resource.description,
        status: this.resource.isActive,
      }
  }
}
