import { Injectable } from '@nestjs/common';
import {
  EmailContext,
  SendInBlueConnector,
} from '@Connector/SendInBlueConnector';
import { TemplateService } from '@Service/TemplateService';

export type EmailParams = {
  title: string;
  content?: string;
};

@Injectable()
export class EmailService {
  private sendInBlueConnector: SendInBlueConnector;
  private templateService: TemplateService;
  constructor(
    sendInBlueConnector: SendInBlueConnector,
    templateService: TemplateService,
  ) {
    this.sendInBlueConnector = sendInBlueConnector;
    this.templateService = templateService;
  }

  public async sendEmail(params: EmailParams, context: EmailContext) {
    const templateParams = Object.assign(
      {
        url: 'https://www.skcvoreppe.fr',
        emailContact: 'contact@skcvoreppe.fr',
        phoneContact: '0627185045',
        siret: '44072251000011',
        receiver: 'Baptiste Brand',
      },
      params,
    );

    // RENDER PARTIALS
    const emailPartials = ['content', 'footer', 'header'];
    emailPartials.forEach((partial) => {
      this.templateService.registerPartial(
        partial,
        `Email/partials/_${partial}.html.hbs`,
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
