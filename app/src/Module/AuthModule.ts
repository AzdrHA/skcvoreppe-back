import { Module } from '@nestjs/common';
import { AuthController } from '@Controller/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthServiceApi } from '@ServiceApi/AuthServiceApi';
import { AuthService } from '@Service/AuthService';
import { UserService } from '@Service/UserService';
import { MailerModule } from '@Module/MailerModule';
import { TokenService } from '@Service/TokenService';

@Module({
  imports: [
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    AuthServiceApi,
    JwtTokenService,
    ConfigService,
    TokenService,
  ],
})
export class AuthModule {}
