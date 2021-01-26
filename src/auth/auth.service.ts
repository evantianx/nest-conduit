import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPayload, LoginDTO, RegisterDTO } from '../models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload: AuthPayload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (user && (await user.comparePassword(password))) {
        const payload: AuthPayload = { username: user.username };
        const token = this.jwtService.sign(payload);
        return { user: { ...user.toJSON(), token } };
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (e) {
      if (e.response) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }
}
