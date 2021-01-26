import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException();
    }
    return { profile: user };
  }

  async updateUser(username: string, data: UpdateUserDTO) {
    await this.userRepo.update({ username }, data);
    return this.userRepo.find({ where: { username } });
  }
}
