import { AppConfigInterface } from '@Config/App/AppConfigInterface';
import DatabaseConfiguration from '@Config/Database/DatabaseConfiguration';
import JwtConfiguration from '@Config/Jwt/JwtConfiguration';

export default (): AppConfigInterface => ({
  basePath: '/api/v1',
  sendInBlueKey: process.env.SENDINBLUE_KEY,
  emailDelivery: process.env.EMAIL_DELIVERY,
  database: DatabaseConfiguration(),
  jwt: JwtConfiguration(),
});
