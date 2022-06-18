import { Injectable } from '@nestjs/common';
import { DefaultServiceApi } from './DefaultServiceApi';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthService } from '@Service/AuthService';
import { Request } from 'express';
import { User } from '@Entity/User/User';
import { ApiException } from '../Exception/ApiException';
import { NotifEventDispatcher } from '../Dispatcher/NotifEventDispatcher';
import { Event } from '@Entity/Event/Event';

@Injectable()
export class AuthServiceApi extends DefaultServiceApi {
  private jwtTokenService: JwtTokenService;
  private authService: AuthService;
  private notifEventDispatcher: NotifEventDispatcher;

  public constructor(
    jwtTokenService: JwtTokenService,
    authService: AuthService,
    notifEventDispatcher: NotifEventDispatcher,
  ) {
    super();
    this.jwtTokenService = jwtTokenService;
    this.authService = authService;
    this.notifEventDispatcher = notifEventDispatcher;
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
    const user = await User.findOneBy({ email });
    if (!user) throw new ApiException('User not found');

    return this.notifEventDispatcher.dispatchMessage(
      Event.USER_FORGOT_PASSWORD,
      user,
    );

    /*const user = await User.findOneBy({ email });
    if (!user) throw new ApiException('User not found');

    const token = new Token();
    token.user = user;
    token.type = TokenFormat.FORGOT_PASSWORD;
    await token.save();

    console.log(email);*/
  }
}
