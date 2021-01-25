import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepo.create(credentials);
      return user.save();
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
        return user;
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
