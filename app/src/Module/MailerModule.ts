import { Module } from '@nestjs/common';
import { SendInBlueConnector } from '@Connector/SendInBlueConnector';
import { ConfigService } from '@nestjs/config';
import { NotifEventDispatcher } from '../Dispatcher/NotifEventDispatcher';
import { EmailService } from '@Service/EmailService';
import { TemplateService } from '@Service/TemplateService';

@Module({
  providers: [
    ConfigService,
    SendInBlueConnector,
    NotifEventDispatcher,
    EmailService,
    TemplateService,
  ],
  exports: [
    ConfigService,
    SendInBlueConnector,
    NotifEventDispatcher,
    EmailService,
    TemplateService,
  ],
})
export class MailerModule {}
