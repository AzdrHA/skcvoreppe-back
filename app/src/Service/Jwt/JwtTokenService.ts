import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { RefreshTokenRepository } from '@Repository/RefreshTokenRepository';
import { RefreshToken } from '@Entity/RefreshToken';
import * as randtoken from 'rand-token';
import { ApiException } from '../../Exception/ApiException';
import { TranslatorService } from 'nestjs-translator';

@Injectable()
export class JwtTokenService {
  private jwtService: JwtService;
  private refreshTokenRepository: RefreshTokenRepository;
  private translator: TranslatorService;

  public constructor(
    jwtService: JwtService,
    refreshTokenRepository: RefreshTokenRepository,
    translator: TranslatorService,
  ) {
    this.jwtService = jwtService;
    this.refreshTokenRepository = refreshTokenRepository;
    this.translator = translator;
  }

  public async sign(payload: { email: string }, options?: JwtSignOptions) {
    return {
      token: this.jwtService.sign(payload, options),
      refresh_token: await this.createNewRefreshToken(payload),
    };
  }

  public async createNewRefreshToken(payload: { email: string }) {
    const validDate = new Date();
    validDate.setDate(validDate.getDate() + 2);

    const refreshToken = new RefreshToken();
    refreshToken.email = payload.email;
    refreshToken.refresh_token = randtoken.suid(60);
    refreshToken.valid = validDate;
    await this.refreshTokenRepository.save(refreshToken);
    return refreshToken.refresh_token;
  }

  public async checkRefreshToken(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOneBy({
      refresh_token: refreshToken,
    });

    if (token && token.valid > new Date()) {
      return this.sign({ email: token.email });
    }

    throw new ApiException(this.translator.translate('INVALID_REFRESH_TOKEN'));
  }
}
