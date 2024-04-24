import JsonResource from './core/json_resource.js'

export default class ProductCategoryResource extends JsonResource {
  toArray(): any {
    return {
      name: this.resource.name,
      status: this.resource.isActive,
    }
  }
}
