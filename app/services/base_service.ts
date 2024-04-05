import CustomException from '#exceptions/custom_exception'
import env from '#start/env'
import { Exception } from '@adonisjs/core/exceptions'

export default class BaseService {
  private code: number = 200
  private message: string = ""
  private data: any = null
  private error: any = null

  setCode(code: number) {
    this.code = code
    return this
  }

  setMessage(message: string) {
    this.message = message
    return this
  }

  setData(data: any) {
    this.data = data
    return this
  }

  setError(error: any) {
    this.error = error
    return this
  }

  getCode() {
    return this.code
  }

  getData() {
    return this.data
  }

  toJson() {
    return Object.fromEntries(
      Object.entries({
        code: this.code,
        message: this.message,
        data: this.data,
        errors: this.error,
      }).filter(([, v]) => typeof v !== 'undefined' && v !== null)
    )
  }

  toJsonResource(resource: any) {
    if (!this.error) {
      if (Array.isArray(this.data)) {
        this.data = resource.collection(this.data)
      } else {
        this.data = resource.item(this.data)
      }
    }

    return this.toJson()
  }

  exceptionCustom(error: Exception, _message = 'Terjadi suatu kesalahan') {
    let code =
      error.status !== undefined && error.status >= 100 && error.status < 600 ? error.status : 500

    if (error instanceof CustomException) {
      _message = error.message
    }

    if (env.get('NODE_ENV') !== 'production') {
      _message = error.message
    }

    this.code = code
    this.message = _message
    this.error = error.stack

    return this
  }
}
