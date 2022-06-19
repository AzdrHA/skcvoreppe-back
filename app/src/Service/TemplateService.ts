import { Injectable } from '@nestjs/common';
import * as path from 'path';
import Handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class TemplateService {
  private readonly baseTemplatePath = path.join(
    __dirname,
    '../../',
    'templates',
  );

  /**
   * RegisterPartial
   * @param {string} name
   * @param {string} templatePath
   * @param {any | null} templateParams
   * @return {void}
   */
  public registerPartial = (
    name: string,
    templatePath: string,
    templateParams?: any | null,
  ): void => {
    Handlebars.registerPartial(
      name,
      this.renderTemplate(templatePath, templateParams),
    );
  };

  /**
   * RenderTemplate
   * @param {string} templatePath
   * @param {any | null} templateParams
   * @return {string}
   */
  public renderTemplate = (
    templatePath: string,
    templateParams?: any | null,
  ): string => {
    return Handlebars.compile(
      fs
        .readFileSync(path.join(this.baseTemplatePath, templatePath))
        .toString(),
    )(templateParams);
  };

  /**
   * Render
   * @param {string} htmlContent
   * @param {any | null} templateParams
   */
  public render = (htmlContent: string, templateParams?: any | null) => {
    return Handlebars.compile(htmlContent)(templateParams);
  };
}
