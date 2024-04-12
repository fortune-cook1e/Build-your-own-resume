import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { UserWithPrivateInfo } from '@fe-cookie/resume-generator-shared';

export const UseUser = createParamDecorator(
  (data: keyof UserWithPrivateInfo, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserWithPrivateInfo;
    if (!user) throw new BadRequestException('Decorator Error');
    return data ? user[data] : user; // 返回指定字段或整个用户对象
  },
);
