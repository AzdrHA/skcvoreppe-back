import { Injectable } from '@nestjs/common';
import { DefaultServiceApi } from './DefaultServiceApi';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthService } from '@Service/AuthService';
import { Request } from 'express';
import { User } from '@Entity/User/User';

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

  public async login(request: Request, userData: User) {
    const user = await this.authService.validateUserCredentials(
      userData.email,
      userData.password,
    );

    return {
      ...user,
      token: this.jwtTokenService.sign({ email: 'b.brand.ascan.io' }),
    };
  }
}
