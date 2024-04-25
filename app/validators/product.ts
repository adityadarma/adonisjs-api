import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    product_category_id: vine.number(),
    name: vine
      .string()
      .trim()
      .maxLength(50)
      .unique(async (db, value) => {
        const role = await db.from('products').where('name', value).first()
        return !role
      }),
    price_buy: vine.number(),
    price_sell: vine.number(),
    status: vine.boolean(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    product_category_id: vine.number(),
    name: vine
      .string()
      .trim()
      .maxLength(50)
      .unique(async (db, value, field) => {
        const role = await db.from('products')
          .whereNot('id', field.meta.id)
          .where('name', value).first()
        return !role
      }),
    price_buy: vine.number(),
    price_sell: vine.number(),
    status: vine.boolean(),
  })
)

export const messageProductValidator = (vine.messagesProvider = new SimpleMessagesProvider({
  'product_category_id.required': 'Produk kategori tidak boleh kosong',
  'name.required': 'Nama tidak boleh kosong',
  'name.maxLength': 'Nama terlalu panjang, maks 50 huruf',
  'name.database.unique': 'Nama sudah ada di database',
  'price_buy.required': 'Harga beli tidak boleh kosong',
  'price_sell.required': 'Harga jual tidak boleh kosong',
  'status.required': 'Status tidak boleh kosong',
}))
