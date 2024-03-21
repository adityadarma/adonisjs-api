import UserRepository from "../repositories/user_repository.js";
import { inject } from "@adonisjs/core";
import BaseService from "./base_service.js";
import CustomException from "#exceptions/custom_exception";

@inject()
export default class UserService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan')
      }

      return this.setCode(200)
        .setMessage('Data user')
        .setData(user)
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async getAllUser() {
    try {
      let users = await this.userRepository.getAll()

      return this.setCode(200)
        .setMessage('Data users')
        .setData(users)
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async saveUser(data: any) {
    try {
      await this.userRepository.store({
        'role_id': data.role_id,
        'email': data.email,
        'name': data.name,
        'password': data.password
      })

      return this.setCode(201)
        .setMessage('Data user created')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async updateUser(id: number, data: any) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan')
      }

      await this.userRepository.update(id, {
        'email': data.email,
        'name': data.name
      })

      return this.setCode(200)
        .setMessage('Data users updated')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new CustomException('Data tidak ditemukan')
      }

      await this.userRepository.delete(id)

      return this.setCode(200)
        .setMessage('Data users deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
