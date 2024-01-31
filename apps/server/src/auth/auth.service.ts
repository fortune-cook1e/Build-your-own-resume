import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ErrorMessage } from '../constants';
import { LoginDto, Payload } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {}

  // generate hashed password
  private hash(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private generateSalt(rounds: number = 10): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  // compare plain password and hashed password
  private compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async checkPassword(password: string, hashedPassword: string) {
    const isValid = await this.compare(password, hashedPassword);
    if (!isValid) {
      throw new BadRequestException(ErrorMessage.InvalidCredentials);
    }
  }

  generateToken(type: 'access' | 'refresh', payload?: Payload) {
    switch (type) {
      case 'access':
        if (!payload)
          throw new InternalServerErrorException(ErrorMessage.InvalidPayload);
        return this.jwtService.sign(payload, {
          secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m', // 15 minutes
        });
      case 'refresh':
        if (!payload)
          throw new InternalServerErrorException(ErrorMessage.InvalidPayload);
        return this.jwtService.sign(payload, {
          secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
          expiresIn: '2d', // 2 days
        });

      default:
        throw new InternalServerErrorException('InvalidGrantType: ' + type);
    }
  }

  async register({ name, username, password, email }: RegisterDto) {
    const salt = await this.generateSalt();
    try {
      const hashedPassword = await this.hash(password, salt);
      const user = await this.userService.create({
        name,
        username,
        password: hashedPassword,
        email,
        emailVerified: false,
        salt,
      });

      // Todo: send check email
      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  // check user
  async authenticate({ identifier, password }: LoginDto) {
    try {
      const user = await this.userService.findOneByIdentifier(identifier);
      if (!user) {
        throw new BadRequestException(ErrorMessage.InvalidCredentials);
      }

      await this.checkPassword(password, user.password);

      return user;
    } catch (e) {
      throw new BadRequestException(ErrorMessage.InvalidCredentials);
    }
  }

  async updateRefreshToken(email: string, token: string | null) {
    return this.userService.updateByEmail(email, {
      refreshToken: token,
      lastSignedIn: token ? new Date() : undefined,
    });
  }

  async validateRefreshToken(payload: Payload, token: string) {
    const user = await this.userService.findOneById(payload.id);
    const userToken = user.refreshToken;

    if (!userToken || userToken !== token) {
      throw new ForbiddenException();
    }
    return user;
  }
}
