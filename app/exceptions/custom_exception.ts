import { Exception } from '@adonisjs/core/exceptions'

export default class CustomException extends Exception {
  static status = 400
}
