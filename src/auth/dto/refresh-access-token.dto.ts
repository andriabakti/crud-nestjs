import { IsNotEmpty } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}
