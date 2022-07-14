import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DefaultController } from '@Controller/DefaultController';
import { Request } from 'express';
import { AuthServiceApi } from '@ServiceApi/AuthServiceApi';
import { User } from '@Entity/User/User';
import { ResetPasswordAuthDto } from '../Type/dto/Auth/ResetPasswordAuthDto';
import { VerifyTokenAuthDto } from '../Type/dto/Auth/VerifyTokenAuthDto';
import { RefreshAuthDto } from '../Type/dto/Auth/RefreshAuthDto';

@Controller('/auth')
export class AuthController extends DefaultController {
  private readonly authServiceApi: AuthServiceApi;

  public constructor(authServiceApi: AuthServiceApi) {
    super();
    this.authServiceApi = authServiceApi;
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ groups: ['login'] }))
  public login(@Req() request: Request, @Body() user: User) {
    return this.handleRequest(request, {
      function: 'login',
      service: this.authServiceApi,
      args: [user],
    });
  }

  @Post('/register')
  public register(@Req() request: Request, @Body() user: User) {
    return this.handleRequest(request, {
      function: 'register',
      service: this.authServiceApi,
      args: [user],
    });
  }

  @Post('/forgot-password')
  @UsePipes(new ValidationPipe({ groups: ['forgotPassword'] }))
  public forgotPassword(
    @Req() request: Request,
    @Body() { email }: { email: string },
  ) {
    return this.handleRequest(request, {
      function: 'forgotPassword',
      service: this.authServiceApi,
      args: [email],
    });
  }

  @Post('/refresh')
  public refresh(
    @Req() request: Request,
    @Body() { refresh_token }: RefreshAuthDto,
  ) {
    return this.handleRequest(request, {
      function: 'refresh',
      service: this.authServiceApi,
      args: [refresh_token],
    });
  }

  @Post('/verify-token')
  public verifyToken(
    @Req() request: Request,
    @Body() { token, type }: VerifyTokenAuthDto,
  ) {
    return this.handleRequest(request, {
      function: 'verifyToken',
      service: this.authServiceApi,
      args: [token, type],
    });
  }

  @Post('/reset-password')
  public resetPassword(
    @Req() request: Request,
    @Body() data: ResetPasswordAuthDto,
  ) {
    return this.handleRequest(request, {
      function: 'resetPassword',
      service: this.authServiceApi,
      args: [data],
    });
  }
}
