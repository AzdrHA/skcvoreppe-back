import { Injectable } from '@nestjs/common';
import {
  EmailContext,
  SendInBlueConnector,
} from '@Connector/SendInBlueConnector';
import Handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

export type EmailParams = {
  title: string;
  content?: string;
};

@Injectable()
export class EmailService {
  private sendInBlueConnector: SendInBlueConnector;
  constructor(sendInBlueConnector: SendInBlueConnector) {
    this.sendInBlueConnector = sendInBlueConnector;
  }

  public async sendEmail(params: EmailParams, context: EmailContext) {
    const template = Handlebars.compile(
      fs
        .readFileSync(path.join(__dirname, '../../', 'templates/email.hbs'))
        .toString(),
    );

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

    const htmlContent = Handlebars.compile(context.htmlContent);
    templateParams.content = htmlContent(templateParams);

    context.body = template(templateParams);

    return this.sendInBlueConnector.sendDirectEmail(
      ['b.brand@ascan.io'],
      context,
    );
  }
}
