import { Module } from '@nestjs/common';
import { AuthController } from '@Controller/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthServiceApi } from '@ServiceApi/AuthServiceApi';
import { AuthService } from '@Service/AuthService';

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
  providers: [AuthService, AuthServiceApi, JwtTokenService],
})
export class AuthModule {}
