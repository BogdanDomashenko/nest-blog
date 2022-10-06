import { IsNotEmpty, IsEmail } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class SignupDto extends SigninDto {
  @IsEmail()
  email: string;
}
