import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  ErrorMessage,
  UpdateUserDto,
  UserWithPrivateInfo,
  userListSchema,
  userSchema,
} from '@fe-cookie/resume-generator-shared';
import { UseUser } from '@/user/decorators/user.decorator';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error } from 'console';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getAllUsers() {
    const list = await this.userService.findAll();
    return userListSchema.parse(list);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@UseUser() user: UserWithPrivateInfo) {
    return userSchema.parse(user);
  }

  @Post('update')
  @UseGuards(JwtGuard)
  async updateUser(
    @UseUser('email') email: string,
    @Body() data: UpdateUserDto,
  ) {
    try {
      if (email !== data.email) {
        await this.userService.updateByEmail(email, {
          emailVerified: false,
          email: data.email,
          avatar: data.avatar,
        });
      }
      // Todo: send email verfification
      return await this.userService.updateByEmail(email, {
        name: data.name,
        username: data.username,
        avatar: data.avatar,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUserById(@Param('id') id: string) {
    return userSchema.parse(await this.userService.findOneById(id));
  }
}
