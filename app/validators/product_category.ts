import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createProductCategoryValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .maxLength(50)
      .unique(async (db, value) => {
        const role = await db.from('product_categories').where('name', value).first()
        return !role
      }),
    status: vine.boolean(),
  })
)

export const updateProductCategoryValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .maxLength(50)
      .unique(async (db, value, field) => {
        const role = await db.from('product_categories')
          .whereNot('id', field.meta.id)
          .where('name', value).first()
        return !role
      }),
    status: vine.boolean(),
  })
)

export const messageProductCategoryValidator = (vine.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nama tidak boleh kosong',
  'name.maxLength': 'Nama terlalu panjang, maks 50 huruf',
  'name.database.unique': 'Nama sudah ada di database',
  'status.required': 'Status belum dipilih',
}))
