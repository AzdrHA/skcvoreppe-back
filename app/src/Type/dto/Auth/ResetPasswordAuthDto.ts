import { IsNotEmpty, IsString } from 'class-validator';
import { VerifyTokenAuthDto } from './VerifyTokenAuthDto';

export class ResetPasswordAuthDto extends VerifyTokenAuthDto {
  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public confirmPassword: string;
}
