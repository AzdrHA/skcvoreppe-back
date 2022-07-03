import { Body, Controller, Post, Req } from '@nestjs/common';
import { DefaultController } from '@Controller/DefaultController';
import { Request } from 'express';
import { AuthServiceApi } from '@ServiceApi/AuthServiceApi';
import { User } from '@Entity/User/User';

@Controller('/auth')
export class AuthController extends DefaultController {
  private readonly authServiceApi: AuthServiceApi;

  public constructor(authServiceApi: AuthServiceApi) {
    super();
    this.authServiceApi = authServiceApi;
  }

  @Post('/login')
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
}
