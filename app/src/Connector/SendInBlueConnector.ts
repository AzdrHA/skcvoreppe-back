import { Injectable } from '@nestjs/common';
import { SendSmtpEmail, TransactionalEmailsApi } from '@sendinblue/client';
import { ConfigService } from '@nestjs/config';

export type EmailContext = {
  subject: string;
  body: string;
};

@Injectable()
export class SendInBlueConnector {
  private readonly apiKey = '';
  private readonly delivery_address = '';

  private configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
    this.apiKey = configService.get('sendInBlueKey');
    this.delivery_address = configService.get('emailDelivery');
  }

  public prepareSend(): TransactionalEmailsApi {
    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(0, this.apiKey);
    return apiInstance;
  }

  public async sendDirectEmail(emails: string[], context: EmailContext) {
    if (this.delivery_address) emails = [this.delivery_address];

    const emails_to = [];
    emails.forEach((email) => {
      return emails_to.push({ email });
    });

    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.sender = {
      name: this.configService.get('emailSenderName'),
      email: this.configService.get('emailSenderEmail'),
    };
    sendSmtpEmail.to = emails_to;
    sendSmtpEmail.subject = context.subject;
    sendSmtpEmail.htmlContent = context.body;
    sendSmtpEmail.textContent = this.configService.get('emailSenderName');

    try {
      const apiInstance = this.prepareSend();
      const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (e) {
      console.log('Failed to send email: ');
    }
  }
}
