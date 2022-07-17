import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfiguration from '@Config/App/AppConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './AuthModule';
import { AuthenticationMiddleware } from '@Middleware/AuthenticationMiddleware';
import { TranslatorModule } from 'nestjs-translator';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { UserRepository } from '@Repository/User/UserRepository';
import { EventRepository } from '@Repository/Event/EventRepository';
import { UserGenderRepository } from '@Repository/User/UserGenderRepository';
import { CommandModule } from '@Module/CommandModule';
import { StripModule } from '@Module/StripModule';

@Module({
  imports: [
    CommandModule,
    StripModule,
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      EventRepository,
      UserGenderRepository,
    ]),
    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'fr',
      translationSource: '/translation',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    ConfigModule.forRoot({
      load: [AppConfiguration],
    }),
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
