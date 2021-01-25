import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @Length(4, 20)
  username: string;
}
