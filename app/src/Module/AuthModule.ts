import { Module } from '@nestjs/common';
import { AuthController } from '@Controller/AuthController';
import { ConfigService } from '@nestjs/config';
import { AuthServiceApi } from '@ServiceApi/AuthServiceApi';
import { AuthService } from '@Service/AuthService';
import { UserService } from '@Service/UserService';
import { MailerModule } from '@Module/MailerModule';
import { TokenService } from '@Service/TokenService';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { UserRepository } from '@Repository/User/UserRepository';
import { TokenRepository } from '@Repository/TokenRepository';
import { TokenModule } from '@Module/TokenModule';
import { OrderRepository } from '@Repository/Order/OrderRepository';
import { OrderModule } from '@Module/OrderModule';

@Module({
  imports: [
    MailerModule,
    TokenModule,
    OrderModule,
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      TokenRepository,
      OrderRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    AuthServiceApi,
    ConfigService,
    TokenService,
  ],
})
export class AuthModule {}
