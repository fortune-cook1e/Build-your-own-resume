import { Config } from '@/config/schema';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@fe-cookie/resume-generator-shared';
import { COOKIE_ACCESS_FIELD } from '@/constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService,
  ) {
    const extractors = [
      (request: Request) => request?.cookies?.[COOKIE_ACCESS_FIELD],
    ];

    super({
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.findOneById(payload.id);
  }
}
