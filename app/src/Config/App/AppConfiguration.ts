import { AppConfigInterface } from '@Config/App/AppConfigInterface';
import DatabaseConfiguration from '@Config/Database/DatabaseConfiguration';
import JwtConfiguration from '@Config/Jwt/JwtConfiguration';

export default (): AppConfigInterface => ({
  basePath: '/api/v1',
  database: DatabaseConfiguration(),
  jwt: JwtConfiguration(),
});
