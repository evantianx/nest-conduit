import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../auth/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findProfile(@Param('username') username: string) {
    const profile = await this.userService.findByUsername(username);
    if (!profile) {
      throw new NotFoundException();
    }
    return { profile };
  }

  @UseGuards(AuthGuard())
  @Post('/:username/follow')
  async followUser(
    @User() user: UserEntity,
    @Param('username') username: string,
  ) {
    const profile = await this.userService.followUser(user, username);
    return { profile };
  }

  @UseGuards(AuthGuard())
  @Delete('/:username/follow')
  async unfollowUser(
    @User() user: UserEntity,
    @Param('username') username: string,
  ) {
    const profile = await this.userService.unfollowUser(user, username);
    return { profile };
  }
}
