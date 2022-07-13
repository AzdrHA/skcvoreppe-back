import { Module } from '@nestjs/common';
import { SendInBlueConnector } from '@Connector/SendInBlueConnector';
import { ConfigService } from '@nestjs/config';
import { NotifEventDispatcher } from '../Dispatcher/NotifEventDispatcher';
import { EmailService } from '@Service/EmailService';
import { TemplateService } from '@Service/TemplateService';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { EventRepository } from '@Repository/Event/EventRepository';
import { EventContentRepository } from '@Repository/Event/EventContentRepository';

@Module({
  providers: [
    ConfigService,
    SendInBlueConnector,
    NotifEventDispatcher,
    EmailService,
    TemplateService,
  ],
  imports: [
    TypeOrmExModule.forCustomRepository([
      EventRepository,
      EventContentRepository,
    ]),
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
