import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    role_id: vine.number(),
    name: vine.string().trim().maxLength(50),
    email: vine
      .string()
      .trim()
      .maxLength(50)
      .email()
      .unique(async (db, value) => {
        return !(await db.from('users').where('email', value).first())
      }),
    password: vine.string(),
    status: vine.boolean(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    role_id: vine.number(),
    name: vine.string().trim().maxLength(50),
    email: vine
      .string()
      .trim()
      .maxLength(50)
      .email()
      .unique(async (db, value, field) => {
        return !(await db
          .from('users')
          .whereNot('id', field.meta.id)
          .where('email', value)
          .first())
      }),
    password: vine.string().optional(),
    status: vine.boolean(),
  })
)

export const messageUserValidator = (vine.messagesProvider = new SimpleMessagesProvider({
  'role_id.required': 'Role belum dipilih',
  'name.required': 'Nama tidak boleh kosong',
  'name.maxLength': 'Nama terlalu panjang, maks 50 huruf',
  'email.required': 'Email tidak boleh kosong',
  'email.maxLength': 'Email terlalu panjang, maks 100 huruf',
  'email.email': 'Format email salah',
  'email.database.unique': 'Email sudah ada di database',
  'password.required': 'Password tidak boleh kosong',
  'status.required': 'Status belum dipilih',
}))
