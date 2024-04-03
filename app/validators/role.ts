import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(50).unique(async (db, value) => {
      const role = await db
        .from('roles')
        .where('name', value)
        .first()
      return !role
    }),
    description: vine.string().trim().escape().nullable(),
    status: vine.boolean(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(50).unique(async (db, value, field) => {
      const role = await db
        .from('roles')
        .whereNot('id', field.meta.roleId)
        .where('name', value)
        .first()
      return !role
    }),
    description: vine.string().trim().escape().nullable(),
    status: vine.boolean(),
  })
)

export const messageRoleValidator = vine.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nama tidak boleh kosong',
  'name.maxLength': 'Nama terlalu panjang, maks 50 huruf',
  'name.database.unique': 'Nama sudah ada di database',
  'description.required': 'Deskripsi tidak boleh kosong',
  'status.required': 'Status belum dipilih',
})

