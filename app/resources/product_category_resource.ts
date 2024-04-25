import JsonResource from './core/json_resource.js'

export default class ProductCategoryResource extends JsonResource {
  toArray(): any {
    return {
      id: this.resource.id,
      name: this.resource.name,
      status: this.resource.isActive,
    }
  }
}
