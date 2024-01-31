import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshGuard extends AuthGuard('refresh') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh Token expired');
      }
      throw (
        err ||
        new UnauthorizedException(info.message || 'Invalid Refresh Token')
      );
    }
    return user;
  }
}
