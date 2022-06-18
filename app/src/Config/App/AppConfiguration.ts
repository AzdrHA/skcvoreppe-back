import { AppConfigInterface } from '@Config/App/AppConfigInterface';
import DatabaseConfiguration from '@Config/Database/DatabaseConfiguration';
import JwtConfiguration from '@Config/Jwt/JwtConfiguration';

export default (): AppConfigInterface => ({
  basePath: '/api/v1',
  sendInBlueKey: process.env.SENDINBLUE_KEY,
  emailDelivery: process.env.EMAIL_DELIVERY,
  emailSenderName: process.env.EMAIL_SEND_NAME,
  emailSenderEmail: process.env.EMAIL_SEND_EMAIL,
  database: DatabaseConfiguration(),
  jwt: JwtConfiguration(),
});
