import Product from "#models/product"

export default class ProductRepository {
  async findById(id: number) {
    return await Product.findBy('id', id)
  }

  async getAll() {
    return await Product.all()
  }

  async store(data: any, trx?: any) {
    return await Product.create(data, { client: trx })
  }

  async update(model: Product, data: any, trx?: any) {
    model.useTransaction(trx)
    return await model.merge(data).save()
  }

  async delete(model: Product, trx?: any) {
    model.useTransaction(trx)
    return await model.delete()
  }
}
