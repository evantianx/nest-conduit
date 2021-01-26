import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from '../models/user.model';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post()
  register(@Body() credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post('/login')
  login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
