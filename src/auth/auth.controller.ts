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
  register(@Body() credentials: { user: RegisterDTO }) {
    return this.authService.register(credentials.user);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post('/login')
  login(@Body() credentials: { user: LoginDTO }) {
    return this.authService.login(credentials.user);
  }
}
