import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export default (): JwtModuleOptions => ({
  secret: process.env.JWT_SECRET,
});
