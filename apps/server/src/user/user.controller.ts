import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { userListSchema, userSchema } from './dto/user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    const list = await this.userService.findAll();
    return userListSchema.parse(list);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return userSchema.parse(await this.userService.findOneById(id));
  }
}
