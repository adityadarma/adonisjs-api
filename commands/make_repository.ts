import { BaseCommand, args } from '@adonisjs/core/ace'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import fs from 'fs'

export default class MakeRepository extends BaseCommand {
  static commandName = 'make:repository'
  static description = 'Create a new repository class'

  static options: CommandOptions = {}

  @args.string()
  declare name: string

  async run() {
    const nameRepository = this.name;
    const pathRepository = `app/repositories/${stringHelpers.snakeCase(nameRepository)}.ts`;

    if (fs.existsSync(pathRepository)) {
      console.error(`Repository already exists: ${nameRepository}`);
      return;
    }

    const stubContent = fs.readFileSync(`stubs/repository.stub`, 'utf8');
    const replacedContent = stubContent.replace(/RepositoryName/g, nameRepository);

    fs.writeFileSync(pathRepository, replacedContent);
    console.log(`Repository created: ${nameRepository}`);
  }
}
