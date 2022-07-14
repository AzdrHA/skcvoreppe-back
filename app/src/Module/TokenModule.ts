import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { RefreshTokenRepository } from '@Repository/RefreshTokenRepository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService],
    }),
    TypeOrmExModule.forCustomRepository([RefreshTokenRepository]),
  ],
  providers: [JwtTokenService],
  exports: [
    JwtTokenService,
    TypeOrmExModule.forCustomRepository([RefreshTokenRepository]),
  ],
})
export class TokenModule {}
