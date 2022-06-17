import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default (): MysqlConnectionOptions => ({
  type: 'mariadb',
  host: 'mariadb_api',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '../../Entity/**/*{.ts,.js}')],
  logging: false,
  synchronize: true,
  entityPrefix: process.env.DB_TABLE_PREFIX,
});
