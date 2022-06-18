import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export type AppConfigInterface = {
  basePath: string;
  sendInBlueKey: string;
  emailDelivery: string;
  emailSenderName: string;
  emailSenderEmail: string;
  database: MysqlConnectionOptions;
  jwt: JwtModuleOptions;
};
