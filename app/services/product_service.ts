import ProductCategoryRepository from "#repositories/product_category_repository";
import { inject } from "@adonisjs/core";
import BaseService from "./base_service.js";
import CustomException from "#exceptions/custom_exception";
import ProductRepository from "#repositories/product_repository";

@inject()
export default class ProductService extends BaseService{
  constructor(
    private productCategoryRepository: ProductCategoryRepository,
    private productRepository: ProductRepository
  ) {
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
      const category = await this.productCategoryRepository.findById(id)
      if (!category) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.productCategoryRepository.update(category, {
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
      const category = await this.productCategoryRepository.findById(id)
      if (!category) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.productCategoryRepository.delete(category)

      return this.setCode(200).setMessage('Data product category deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async findProductById(id: number) {
    try {
      const product = await this.productRepository.findById(id)
      if (!product) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      return this.setData(product).setCode(200).setMessage('Data product')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async getAllProduct() {
    try {
      const categories = await this.productRepository.getAll()

      return this.setData(categories).setCode(200).setMessage('List data products')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async saveProduct(data: any) {
    try {
      await this.productRepository.store({
        productCategoryId: data.product_category_id,
        name: data.name,
        priceBuy: data.price_buy,
        priceSell: data.price_sell,
        isActive: data.status,
      })

      return this.setCode(201).setMessage('Data product created')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async updateProduct(id: number, data:any) {
    try {
      const product = await this.productRepository.findById(id)
      if (!product) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.productRepository.update(product, {
        productCategoryId: data.product_category_id,
        name: data.name,
        priceBuy: data.price_buy,
        priceSell: data.price_sell,
        isActive: data.status,
      })

      return this.setCode(200).setMessage('Data product updated')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepository.findById(id)
      if (!product) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.productRepository.delete(product)

      return this.setCode(200).setMessage('Data product deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
