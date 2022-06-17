import { Module } from '@nestjs/common';
import { AuthController } from '@Controller/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthServiceApi } from '@ServiceApi/AuthServiceApi';
import { AuthService } from '@Service/AuthService';
import { UserService } from '@Service/UserService';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, AuthServiceApi, JwtTokenService],
})
export class AuthModule {}
