import JsonResource from './core/json_resource.js'
import ProductCategoryResource from './product_category_resource.js'

export default class ProductResource extends JsonResource {
  toArray(): any {
    return {
      id: this.resource.id,
      product_category_id: this.resource.productCategoryId,
      name: this.resource.name,
      price_buy: this.resource.priceBuy,
      price_sell: this.resource.priceSell,
      status: this.resource.isActive,
      product_category: this.mergeResourceWhen(this.resource.productCategory, ProductCategoryResource),
    }
  }
}
