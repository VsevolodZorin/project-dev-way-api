import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  refreshToken: string;
}
