import ProductCategory from "#models/product_category"

export default class ProductCategoryRepository {
  async findById(id: number) {
    return await ProductCategory.findBy('id', id)
  }

  async getAll() {
    return await ProductCategory.all()
  }

  async store(data: any, trx?: any) {
    return await ProductCategory.create(data, { client: trx })
  }

  async update(model: ProductCategory, data: any, trx?: any) {
    model.useTransaction(trx)
    return await model.merge(data).save()
  }

  async delete(model: ProductCategory, trx?: any) {
    model.useTransaction(trx)
    return await model.delete()
  }
}
