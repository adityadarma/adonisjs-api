import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ProductCategory from './product_category.js'

export type ProductAttribute = {
  productCategoryId?: number,
  name: string,
  priceBuy: number,
  priceSell: number,
  isActive: boolean,
}

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productCategoryId: number

  @column()
  declare name: string

  @column()
  declare priceBuy: number

  @column()
  declare priceSell: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ProductCategory)
  declare productCategory: BelongsTo<typeof ProductCategory>
}
