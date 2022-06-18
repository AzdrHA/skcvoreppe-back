import { Injectable } from '@nestjs/common';
import { DefaultServiceApi } from './DefaultServiceApi';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthService } from '@Service/AuthService';
import { Request } from 'express';
import { User } from '@Entity/User/User';
import { ApiException } from '../Exception/ApiException';
import { Token, TokenFormat } from '@Entity/Token';
import { SendInBlueConnector } from '@Connector/SendInBlueConnector';

@Injectable()
export class AuthServiceApi extends DefaultServiceApi {
  private jwtTokenService: JwtTokenService;
  private authService: AuthService;
  private sendInBlueConnector: SendInBlueConnector;

  public constructor(
    jwtTokenService: JwtTokenService,
    authService: AuthService,
    sendInBlueConnector: SendInBlueConnector,
  ) {
    super();
    this.jwtTokenService = jwtTokenService;
    this.authService = authService;
    this.sendInBlueConnector = sendInBlueConnector;
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

  public async forgotPassword(request: Request, email: string) {
    await this.sendInBlueConnector.sendDirectEmail(['azdracito@gmail.com'], {
      subject: 'couycou',
      body: 'coucop',
    });
    /*const user = await User.findOneBy({ email });
    if (!user) throw new ApiException('User not found');

    const token = new Token();
    token.user = user;
    token.type = TokenFormat.FORGOT_PASSWORD;
    await token.save();

    console.log(email);*/
  }
}
