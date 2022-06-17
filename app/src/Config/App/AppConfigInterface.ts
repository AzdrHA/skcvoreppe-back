import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export type AppConfigInterface = {
  basePath: string;
  database: MysqlConnectionOptions;
  jwt: JwtModuleOptions;
};
