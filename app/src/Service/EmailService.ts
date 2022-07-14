import { Injectable } from '@nestjs/common';
import {
  EmailContext,
  SendInBlueConnector,
} from '@Connector/SendInBlueConnector';
import { TemplateService } from '@Service/TemplateService';
import { ConfigService } from '@nestjs/config';

export type EmailParams = {
  title: string;
  content?: string;
};

@Injectable()
export class EmailService {
  private sendInBlueConnector: SendInBlueConnector;
  private templateService: TemplateService;
  private configService: ConfigService;

  constructor(
    sendInBlueConnector: SendInBlueConnector,
    templateService: TemplateService,
    configService: ConfigService,
  ) {
    this.sendInBlueConnector = sendInBlueConnector;
    this.templateService = templateService;
    this.configService = configService;
  }

  public async sendEmail(params: EmailParams, context: EmailContext) {
    const templateParams = Object.assign(
      {
        url: 'https://www.skcvoreppe.fr',
        emailContact: this.configService.get('emailContact'),
        phoneContact: this.configService.get('phoneContact'),
        siret: this.configService.get('siret'),
        receiver: 'Baptiste Brand',
      },
      params,
    );

    // RENDER PARTIALS
    const emailPartials = ['_content', '_footer', '_header'];
    emailPartials.forEach((partial) => {
      this.templateService.registerPartial(
        partial,
        `Email/partials/${partial}.html.hbs`,
        templateParams,
      );
    });

    // RENDER BODY CONTENT
    templateParams.content = this.templateService.render(
      context.htmlContent,
      templateParams,
    );

    // RENDER BASE EMAIL
    context.body = this.templateService.renderTemplate(
      'Email/base.html.hbs',
      templateParams,
    );

    return this.sendInBlueConnector.sendDirectEmail(
      ['b.brand@ascan.io'],
      context,
    );
  }
}
