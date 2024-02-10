import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'identifier' } as IStrategyOptions);
  }

  // use email or username to check user
  async validate(identifier: string, password: string) {
    try {
      return await this.authService.authenticate({ identifier, password });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
