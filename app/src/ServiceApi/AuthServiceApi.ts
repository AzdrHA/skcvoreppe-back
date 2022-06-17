import { Injectable } from '@nestjs/common';
import { DefaultServiceApi } from './DefaultServiceApi';
import { Request } from 'express';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthService } from '@Service/AuthService';

@Injectable()
export class AuthServiceApi extends DefaultServiceApi {
  private jwtTokenService: JwtTokenService;
  private authService: AuthService;

  public constructor(
    jwtTokenService: JwtTokenService,
    authService: AuthService,
  ) {
    super();
    this.jwtTokenService = jwtTokenService;
    this.authService = authService;
  }

  public async login(request: Request) {
    const user = await this.authService.validateUserCredentials(
      'b.brand@ascan.io',
      'azeqsd38',
    );
    return {
      ...user,
      token: this.jwtTokenService.sign({ email: 'b.brand.ascan.io' }),
    };
  }
}
