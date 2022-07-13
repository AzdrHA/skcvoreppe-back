import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfiguration from '@Config/App/AppConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './AuthModule';
import { AuthenticationMiddleware } from '@Middleware/AuthenticationMiddleware';
import { TranslatorModule } from 'nestjs-translator';
import { InitEventsCommand } from '@Command/Init/InitEventsCommand';
import { EventManager } from '../Manager/Event/EventManager';
import { InitUsersCommand } from '@Command/Init/InitUsersCommand';
import { InitUserGenderCommand } from '@Command/Init/InitUserGenderCommand';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { UserRepository } from '@Repository/User/UserRepository';
import { EventRepository } from '@Repository/Event/EventRepository';
import { UserGenderRepository } from '@Repository/User/UserGenderRepository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      EventRepository,
      UserGenderRepository,
    ]),
    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'en',
      translationSource: '/translation',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    CommandModule,
    ConfigModule.forRoot({
      load: [AppConfiguration],
    }),
    AuthModule,
  ],
  providers: [
    InitUsersCommand,
    EventManager,
    InitEventsCommand,
    InitUserGenderCommand,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
