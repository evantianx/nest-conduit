import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  image: string;

  @IsOptional()
  bio: string;
}

export interface AuthPayload {
  username: string;
}
