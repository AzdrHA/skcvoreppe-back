import { Module } from '@nestjs/common';
import { SendInBlueConnector } from '@Connector/SendInBlueConnector';
import { ConfigService } from '@nestjs/config';
import { NotifEventDispatcher } from '../Dispatcher/NotifEventDispatcher';
import { EmailService } from '@Service/EmailService';

@Module({
  providers: [
    ConfigService,
    SendInBlueConnector,
    NotifEventDispatcher,
    EmailService,
  ],
  exports: [
    ConfigService,
    SendInBlueConnector,
    NotifEventDispatcher,
    EmailService,
  ],
})
export class MailerModule {}
