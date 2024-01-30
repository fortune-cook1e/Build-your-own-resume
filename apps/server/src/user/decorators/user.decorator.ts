import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { UserWithPrivateDto } from '../dto/user.dto';

export const User = createParamDecorator(
  (data: keyof UserWithPrivateDto, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserWithPrivateDto;
    if (!user) throw new BadRequestException('Decorator Error');
    return data ? user[data] : user; // 返回指定字段或整个用户对象
  },
);
