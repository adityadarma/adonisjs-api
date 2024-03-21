import CustomException from "#exceptions/custom_exception";
import UserRepository from "#repositories/user_repository";
import hash from "@adonisjs/core/services/hash";
import BaseService from "./base_service.js";
import { inject } from "@adonisjs/core";

@inject()
export default class AuthService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async loginUser(data: any) {
    try {
      const user = await this.userRepository.findByEmail(data['email'])
      if (!user) {
        throw new CustomException('Invalid user credentials')
      }

      const isValid = await hash.verify(user.password, data['password'])
      if (!isValid) {
        throw new CustomException('Invalid user credentials')
      }

      const token = await this.userRepository.createAccessToken(user)

      return this.setCode(200)
        .setMessage('Generate access token')
        .setData(token)
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
