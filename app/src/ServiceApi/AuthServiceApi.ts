import { Injectable } from '@nestjs/common';
import { DefaultServiceApi } from './DefaultServiceApi';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthService } from '@Service/AuthService';
import { Request } from 'express';
import { User } from '@Entity/User/User';
import { ApiException } from '../Exception/ApiException';
import { NotifEventDispatcher } from '../Dispatcher/NotifEventDispatcher';
import { Event } from '@Entity/Event/Event';
import { TokenService } from '@Service/TokenService';

@Injectable()
export class AuthServiceApi extends DefaultServiceApi {
  private jwtTokenService: JwtTokenService;
  private authService: AuthService;
  private notifEventDispatcher: NotifEventDispatcher;
  private tokenService: TokenService;

  public constructor(
    jwtTokenService: JwtTokenService,
    authService: AuthService,
    notifEventDispatcher: NotifEventDispatcher,
    tokenService: TokenService,
  ) {
    super();
    this.jwtTokenService = jwtTokenService;
    this.authService = authService;
    this.notifEventDispatcher = notifEventDispatcher;
    this.tokenService = tokenService;
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

    const token = this.tokenService.generateToken(user);
    await token.save();

    return this.notifEventDispatcher.dispatchMessage(
      Event.USER_FORGOT_PASSWORD,
      token,
    );
  }
}
