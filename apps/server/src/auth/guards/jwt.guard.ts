import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  // custom error
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Authorization Token expired');
      }
      throw (
        err ||
        new UnauthorizedException(info.message || 'Invalid Authorization Token')
      );
    }
    return user;
  }
}