import { IsString } from 'class-validator';

export class SignUpCredendtialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
