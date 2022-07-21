import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { RefreshTokenRepository } from '@Repository/RefreshTokenRepository';
import { UserService } from '@Service/UserService';
import { StripService } from '@Service/StripService';
import { UserRepository } from '@Repository/User/UserRepository';
import { StripConnector } from '@Connector/StripConnector';
import { OrderRepository } from '@Repository/Order/OrderRepository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService],
    }),
    TypeOrmExModule.forCustomRepository([
      RefreshTokenRepository,
      UserRepository,
      OrderRepository,
    ]),
  ],
  providers: [
    ConfigService,
    JwtTokenService,
    UserService,
    StripConnector,
    StripService,
  ],
  exports: [
    ConfigService,
    JwtTokenService,
    UserService,
    StripConnector,
    StripService,
    TypeOrmExModule.forCustomRepository([
      RefreshTokenRepository,
      UserRepository,
    ]),
  ],
})
export class TokenModule {}
