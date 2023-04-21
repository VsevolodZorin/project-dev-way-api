import { IsString } from 'class-validator';

export class CreateEmailActivationDto {
  @IsString()
  email: string;

  @IsString()
  activationLink: string;
}
