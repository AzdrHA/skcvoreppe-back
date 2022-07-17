import { Module } from '@nestjs/common';
import { CommandModule as BaseCommandModule } from 'nestjs-command';
import { InitUsersCommand } from '@Command/Init/InitUsersCommand';
import { InitEventsCommand } from '@Command/Init/InitEventsCommand';
import { InitUserGenderCommand } from '@Command/Init/InitUserGenderCommand';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { UserRepository } from '@Repository/User/UserRepository';
import { EventRepository } from '@Repository/Event/EventRepository';
import { UserGenderRepository } from '@Repository/User/UserGenderRepository';
import { EventManager } from '../Manager/Event/EventManager';
import { UserServiceCommand } from '@ServiceCommand/User/UserServiceCommand';
import { EventServiceCommand } from '@ServiceCommand/Event/EventServiceCommand';
import { UserGenderServiceCommand } from '@ServiceCommand/User/UserGenderServiceCommand';
import { EventContentRepository } from '@Repository/Event/EventContentRepository';
import { AuthService } from '@Service/AuthService';
import { UserService } from '@Service/UserService';
import { InitProductCommand } from '@Command/Init/InitProductCommand';
import { StripModule } from '@Module/StripModule';
import { TestStripPaymentIntents } from '@Command/Test/TestStripPaymentIntents';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      EventRepository,
      EventContentRepository,
      UserGenderRepository,
    ]),
    BaseCommandModule,
    StripModule,
  ],
  providers: [
    EventManager,
    UserServiceCommand,
    EventServiceCommand,
    UserGenderServiceCommand,
    InitUsersCommand,
    InitEventsCommand,
    InitUserGenderCommand,
    InitProductCommand,
    TestStripPaymentIntents,
    AuthService,
    UserService,
  ],
})
export class CommandModule {}
