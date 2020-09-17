import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../model/IMailTemplateProvider';

export default class handlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateContent = await fs.promises.readFile(file, {
      encoding: 'utf8',
    });

    const parseTemplate = handlebars.compile(templateContent);

    return parseTemplate(variables);
  }
}
