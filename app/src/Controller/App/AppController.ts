import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@Service/App/AppService';

@Controller()
export class AppController {
  private appService: AppService;
  private configService: ConfigService;

  public constructor(appService: AppService, configService: ConfigService) {
    this.appService = appService;
    this.configService = configService;
  }

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
