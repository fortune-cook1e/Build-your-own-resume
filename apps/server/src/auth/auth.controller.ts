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
import { AuthService } from './auth.service';
import { UserWithPrivateInfo } from '@fe-cookie/resume-generator-shared';
import { Response } from 'express';
import {
  loginResSchema,
  jwtPayloadSchema,
  RegisterDto,
} from '@fe-cookie/resume-generator-shared';
import { COOKIE_ACCESS_FIELD, COOKIE_REFRESH_FIELD } from '../constants';
import { getCookieOptions } from './utils/cookie';
import { LocalGuard } from './guards/local.guard';
import { User } from '../user/decorators/user.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private async exchangeToken(id: string, email: string) {
    try {
      const payload = jwtPayloadSchema.parse({
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
    user: UserWithPrivateInfo,
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

    const responseData = loginResSchema.parse({
      status: 'authenticated',
      user,
    });

    return responseData;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @User() user: UserWithPrivateInfo,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.handleAuthorization(user, response);
  }

  @Post('register')
  async register(
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.register(data);
    return await this.handleAuthorization(user, response);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(
    @User() user: UserWithPrivateInfo,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.updateRefreshToken(user.email, null);
    response.clearCookie(COOKIE_ACCESS_FIELD);
    response.clearCookie(COOKIE_REFRESH_FIELD);

    return 'Logged out successfully';
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @User() user: UserWithPrivateInfo,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.handleAuthorization(user, response);
  }
}
