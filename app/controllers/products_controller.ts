import ProductResource from "#resources/product_resource"
import ProductService from "#services/product_service"
import { createProductValidator, messageProductValidator, updateProductValidator } from "#validators/product"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  async index({ response }: HttpContext) {
    const result = await this.productService.getAllProduct()

    return response.status(result.getCode()).json(result.toJsonResource(ProductResource))
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductValidator, {
      messagesProvider: messageProductValidator,
    })

    const result = await this.productService.saveProduct(data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async show({ request, response }: HttpContext) {
    const result = await this.productService.findProductById(request.params().id)

    return response.status(result.getCode()).json(result.toJsonResource(ProductResource))
  }

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(updateProductValidator, {
      messagesProvider: messageProductValidator,
      meta: {
        id: request.params().id,
      },
    })

    const result = await this.productService.updateProduct(request.params().id, data)

    return response.status(result.getCode()).json(result.toJson())
  }

  async delete({ request, response }: HttpContext) {
    const result = await this.productService.deleteProduct(request.params().id)

    return response.status(result.getCode()).json(result.toJson())
  }
}
