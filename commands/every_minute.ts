import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class EveryMinute extends BaseCommand {
  static commandName = 'every:minute'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "EveryMinute"')
  }
}