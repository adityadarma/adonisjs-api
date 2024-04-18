import VerifyENotification from '#mails/verify_e_notification'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import { Job } from 'adonisjs-jobs'

type SendEmailVerifyPayload = {
  user: User
}

export default class SendEmailVerify extends Job {
  async handle(payload: SendEmailVerifyPayload) {
    await mail.send(new VerifyENotification(payload.user.email))
  }
}
