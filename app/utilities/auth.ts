import { HttpContext } from '@adonisjs/core/http'

export default class Auth {
  static async check() {
    return HttpContext.getOrFail().auth.isAuthenticated
  }

  static async id() {
    if (await this.check()) {
      return HttpContext.getOrFail().auth.user?.id
    }
    return null
  }

  static async user() {
    if (await this.check()) {
      return HttpContext.getOrFail().auth.getUserOrFail()
    }
    return null
  }
}
