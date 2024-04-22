import RoleRepository from '#repositories/role_repository'
import { inject } from '@adonisjs/core'
import BaseService from './base_service.js'
import CustomException from '#exceptions/custom_exception'

@inject()
export default class RoleService extends BaseService {
  constructor(private roleRepository: RoleRepository) {
    super()
  }

  async findRoleById(id: number) {
    try {
      const role = await this.roleRepository.findById(id)
      if (!role) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      return this.setData(role).setCode(200).setMessage('Data role')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async getAllRole() {
    try {
      const roles = await this.roleRepository.queryAllWithRelation(['users'])

      return this.setData(roles).setCode(200).setMessage('List data role')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async saveRole(data: any) {
    try {
      await this.roleRepository.store({
        name: data.name,
        description: data.description,
        isActive: data.status,
      })

      return this.setCode(201).setMessage('Data role created')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async updateRole(id: number, data: any) {
    try {
      const role = await this.roleRepository.findById(id)
      if (!role) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.roleRepository.update(role, {
        name: data.name,
        description: data.description,
        isActive: data.status,
      })

      return this.setCode(200).setMessage('Data role updated')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }

  async deleteRole(id: number) {
    try {
      const role = await this.roleRepository.findById(id)
      if (!role) {
        throw new CustomException('Data tidak ditemukan', 404)
      }

      await this.roleRepository.delete(role)

      return this.setCode(200).setMessage('Data role deleted')
    } catch (error) {
      return this.exceptionCustom(error)
    }
  }
}
