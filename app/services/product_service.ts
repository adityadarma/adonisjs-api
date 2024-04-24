import ProductCategoryRepository from "#repositories/product_category_repository";
import { inject } from "@adonisjs/core";
import BaseService from "./base_service.js";
import CustomException from "#exceptions/custom_exception";

@inject()
export default class ProductService extends BaseService{
  constructor(private productCategoryRepository: ProductCategoryRepository) {
    super()
  }

  async findProductCategoryById(id: number) {
    try {
      const category = await this.productCategoryRepository.findById(id)
      if (!category) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      return this.setData(category).setCode(200).setMessage('Data category')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async getAllProductCategory() {
    try {
      const categories = await this.productCategoryRepository.getAll()

      return this.setData(categories).setCode(200).setMessage('List data categories')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async saveProductCategory(data: any) {
    try {
      await this.productCategoryRepository.store({
        name: data.name,
        isActive: data.status,
      })

      return this.setCode(201).setMessage('Data product category created')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async updateProductCategory(id: number, data:any) {
    try {
      const role = await this.productCategoryRepository.findById(id)
      if (!role) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.productCategoryRepository.update(role, {
        name: data.name,
        isActive: data.status,
      })

      return this.setCode(200).setMessage('Data product category updated')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async deleteProductCategory(id: number) {
    try {
      const role = await this.productCategoryRepository.findById(id)
      if (!role) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.productCategoryRepository.delete(role)

      return this.setCode(200).setMessage('Data product category deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
