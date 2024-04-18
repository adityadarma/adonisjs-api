import { BaseMail } from '@adonisjs/mail'

export default class VerifyENotification extends BaseMail {
  constructor(public email: string) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
    .to(this.email)
    .from('info@example.org')
    .subject('Verify your email address')
    .text(`
      Verify email address
      Please visit https://myapp.com to verify your email address
    `)
  }
}
