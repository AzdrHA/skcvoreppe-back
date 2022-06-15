import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../Service/App/AppService';

@Controller()
export class AppController {
  private appService: AppService;

  public constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
