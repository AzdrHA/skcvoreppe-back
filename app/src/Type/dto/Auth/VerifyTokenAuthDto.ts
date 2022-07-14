import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenAuthDto {
  @IsString()
  @IsNotEmpty()
  public token: string;

  @IsString()
  @IsNotEmpty()
  public type: string;
}
