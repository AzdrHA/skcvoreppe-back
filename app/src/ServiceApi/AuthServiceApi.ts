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
import { RefreshTokenRepository } from '@Repository/RefreshTokenRepository';
import { TranslatorService } from 'nestjs-translator';
import { TokenFormat } from '@Entity/Token';
import { ResetPasswordAuthDto } from '../Type/dto/Auth/ResetPasswordAuthDto';

@Injectable()
export class AuthServiceApi extends DefaultServiceApi {
  private jwtTokenService: JwtTokenService;
  private authService: AuthService;
  private notifEventDispatcher: NotifEventDispatcher;
  private tokenService: TokenService;
  private userService: UserService;
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private translator: TranslatorService;

  public constructor(
    jwtTokenService: JwtTokenService,
    authService: AuthService,
    notifEventDispatcher: NotifEventDispatcher,
    tokenService: TokenService,
    userService: UserService,
    userRepository: UserRepository,
    tokenRepository: TokenRepository,
    refreshTokenRepository: RefreshTokenRepository,
    translator: TranslatorService,
  ) {
    super();
    this.jwtTokenService = jwtTokenService;
    this.authService = authService;
    this.notifEventDispatcher = notifEventDispatcher;
    this.tokenService = tokenService;
    this.userService = userService;
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.translator = translator;
  }

  public async login(request: Request, userData: User & { type: string }) {
    const user = await this.authService.validateUserCredentials(
      userData.email,
      userData.password,
    );

    console.log(userData);
    if (userData.type === 'admin' && userData.role === UserRoles.ROLE_USER)
      throw new ApiException(
        this.translator.translate('EMAIL_OR_PASSWORD_INCORRECT'),
      );

    return {
      ...user,
      ...(await this.jwtTokenService.sign({ email: userData.email })),
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
    if (!user)
      throw new ApiException(this.translator.translate('USER_NOT_FOUND'));

    const token = this.tokenService.generateToken(
      user,
      TokenFormat.FORGOT_PASSWORD,
    );
    await this.tokenRepository.save(token);

    await this.notifEventDispatcher.dispatchMessage(
      Event.USER_FORGOT_PASSWORD,
      token,
    );

    return { test: 'sfsf' };
  }

  public async refresh(request: Request, refreshToken: string) {
    return this.jwtTokenService.checkRefreshToken(refreshToken);
  }

  public async verifyToken(request: Request, token: string, type: string) {
    const checksToken = await this.tokenRepository.validToken(token, type);

    if (!checksToken)
      throw new ApiException(
        this.translator.translate('TOKEN_INVALID_OR_EXPIRED'),
      );

    return checksToken;
  }

  public async resetPassword(request: Request, data: ResetPasswordAuthDto) {
    if (data.password !== data.confirmPassword)
      throw new ApiException(
        this.translator.translate('PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH'),
      );

    const user = await this.userRepository.getUserFromToken(
      data.token,
      data.type,
    );

    await this.authService.encryptPassword(user, data.password);
    await this.userRepository.save(user);
    await this.tokenRepository.remove(user.tokens);
    return this.userService.serializeUser(user);
  }
}
