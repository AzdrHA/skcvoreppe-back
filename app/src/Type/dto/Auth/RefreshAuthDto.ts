import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsString()
  @IsNotEmpty()
  public refresh_token: string;
}
