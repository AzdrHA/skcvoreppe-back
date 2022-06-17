import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@Controller/App/AppController';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfiguration from '@Config/App/AppConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './AuthModule';
import { AppService } from '@Service/App/AppService';
import { SendInBlueConnector } from '@Connector/SendInBlueConnector';
import { CreateUserCommand } from '@Command/CreateUserCommand';
import { AuthenticationMiddleware } from '@Middleware/AuthenticationMiddleware';
import { TranslatorModule } from 'nestjs-translator';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService, SendInBlueConnector, CreateUserCommand],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}