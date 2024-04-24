import { BaseCommand, args } from '@adonisjs/core/ace'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import fs from 'fs'

export default class MakeResource extends BaseCommand {
  static commandName = 'make:resource'
  static description = 'Create a new resource class'

  static options: CommandOptions = {}

  @args.string()
  declare name: string

  async run() {
    const nameResource = this.name;
    const pathResource = `app/resources/${stringHelpers.snakeCase(nameResource)}.ts`;

    if (fs.existsSync(pathResource)) {
      console.error(`Resource already exists: ${nameResource}`);
      return;
    }

    const stubContent = fs.readFileSync(`stubs/resource.stub`, 'utf8');
    const replacedContent = stubContent.replace(/ResourceName/g, nameResource);

    fs.writeFileSync(pathResource, replacedContent);
    console.log(`Resource created: ${nameResource}`);
  }
}
