import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ErrorMessage } from '../constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string) {
    const user = this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    if (!user) {
      throw new InternalServerErrorException(ErrorMessage.UserNotFound);
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data });
  }

  async updateByEmail(email: string, data: Prisma.UserUpdateArgs['data']) {
    return await this.prismaService.user.update({
      where: { email },
      data,
    });
  }
}
