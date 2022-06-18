import { Module } from '@nestjs/common';
import { SendInBlueConnector } from '@Connector/SendInBlueConnector';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, SendInBlueConnector],
  exports: [ConfigService, SendInBlueConnector],
})
export class MailerModule {}
