import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UserWithPrivateDto } from '../user/dto/user.dto';
import { Response } from 'express';
import { authorizationSchema, payloadSchema } from './dto/auth.dto';
import { COOKIE_ACCESS_FIELD, COOKIE_REFRESH_FIELD } from '../constants';
import { getCookieOptions } from './utils/cookie';
import { LocalGuard } from './guards/local.guard';
import { User } from '../user/decorators/user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private async exchangeToken(id: string, email: string) {
    try {
      const payload = payloadSchema.parse({
        id,
        email,
      });
      const accessToken = this.authService.generateToken('access', payload);
      const refreshToken = this.authService.generateToken('refresh', payload);

      await this.authService.updateRefreshToken(email, refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  private async handleAuthorization(
    user: UserWithPrivateDto,
    response: Response,
  ) {
    const { accessToken, refreshToken } = await this.exchangeToken(
      user.id,
      user.email,
    );

    response.cookie(
      COOKIE_ACCESS_FIELD,
      accessToken,
      getCookieOptions('access'),
    );

    response.cookie(
      COOKIE_REFRESH_FIELD,
      refreshToken,
      getCookieOptions('refresh'),
    );

    const responseData = authorizationSchema.parse({
      status: 'authenticated',
      user,
    });

    response.status(200).send(responseData);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(
    @User() user: UserWithPrivateDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.handleAuthorization(user, response);
  }

  @Post('register')
  async register(
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.register(data);
    return this.handleAuthorization(user, response);
  }
}
