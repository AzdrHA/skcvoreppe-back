import { Injectable } from '@nestjs/common';
import { DefaultServiceApi } from './DefaultServiceApi';
import { JwtTokenService } from '@Service/Jwt/JwtTokenService';
import { AuthService } from '@Service/AuthService';
import { Request } from 'express';
import { User, UserRoles } from '@Entity/User/User';
import { ApiException } from '../Exception/ApiException';
import { NotifEventDispatcher } from '../Dispatcher/NotifEventDispatcher';
import { Event } from '@Entity/Event/Event';
import { TokenService } from '@Service/TokenService';
import { UserService } from '@Service/UserService';
import { UserRepository } from '@Repository/User/UserRepository';
import { TokenRepository } from '@Repository/TokenRepository';

@Injectable()
export class AuthServiceApi extends DefaultServiceApi {
  private jwtTokenService: JwtTokenService;
  private authService: AuthService;
  private notifEventDispatcher: NotifEventDispatcher;
  private tokenService: TokenService;
  private userService: UserService;
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  public constructor(
    jwtTokenService: JwtTokenService,
    authService: AuthService,
    notifEventDispatcher: NotifEventDispatcher,
    tokenService: TokenService,
    userService: UserService,
    userRepository: UserRepository,
    tokenRepository: TokenRepository,
  ) {
    super();
    this.jwtTokenService = jwtTokenService;
    this.authService = authService;
    this.notifEventDispatcher = notifEventDispatcher;
    this.tokenService = tokenService;
    this.userService = userService;
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  public async login(request: Request, userData: User) {
    const user = await this.authService.validateUserCredentials(
      userData.email,
      userData.password,
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (userData.type === 'admin' && userData.role === UserRoles.ROLE_USER)
      throw new ApiException('Email or password are incorrect');

    return {
      ...user,
      token: this.jwtTokenService.sign({ email: 'b.brand.ascan.io' }),
    };
  }

  public async register(request: Request, userDate: User) {
    const user = this.userRepository.create(userDate);
    await this.authService.encryptPassword(user, user.password);
    await this.userRepository.save(user);
    return this.userService.serializeUser(user);
  }

  public async forgotPassword(request: Request, email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new ApiException('User not found');

    const token = this.tokenService.generateToken(user);
    await this.tokenRepository.save(token);

    await this.notifEventDispatcher.dispatchMessage(
      Event.USER_FORGOT_PASSWORD,
      token,
    );

    return { test: 'sfsf' };
  }
}
