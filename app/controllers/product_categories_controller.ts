import ProductCategoryResource from "#resources/product_category_resource";
import ProductService from "#services/product_service";
import { createProductCategoryValidator, messageProductCategoryValidator, updateProductCategoryValidator } from "#validators/product_category";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class ProductCategoriesController {
  constructor(private productService: ProductService) {}

  async index({ response }: HttpContext) {
    const result = await this.productService.getAllProductCategory()

    return response.status(result.getCode()).json(result.toJsonResource(ProductCategoryResource))
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductCategoryValidator, {
      messagesProvider: messageProductCategoryValidator,
    })

    const result = await this.productService.saveProductCategory(data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async show({ request, response }: HttpContext) {
    const result = await this.productService.findProductCategoryById(request.params().id)

    return response.status(result.getCode()).json(result.toJsonResource(ProductCategoryResource))
  }

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(updateProductCategoryValidator, {
      messagesProvider: messageProductCategoryValidator,
      meta: {
        id: request.params().id,
      },
    })

    const result = await this.productService.updateProductCategory(request.params().id, data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async delete({ request, response }: HttpContext) {
    const result = await this.productService.deleteProductCategory(request.params().id)

    return response.status(result.getCode()).json(result.toJson())
  }
}
