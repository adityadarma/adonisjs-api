import { Exception } from '@adonisjs/core/exceptions'

export default class UnAuthorizedException extends Exception {
  constructor(message?: string) {
    super(message, { code: 'E_UNAUTHORIZED', status: 401 })
  }
}
