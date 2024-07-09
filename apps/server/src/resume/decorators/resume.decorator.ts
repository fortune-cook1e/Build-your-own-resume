import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Resume } from 'shared';

export const UseResume = createParamDecorator(
  (data: keyof Resume | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const resume = request.payload?.resume as Resume;
    return data ? resume[data] : resume;
  },
);
