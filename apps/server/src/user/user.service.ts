import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ErrorMessage } from 'shared';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOneById(id: string) {
    const user = await this.prismaService.user.findUnique({
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

  // find user by email or username
  async findOneByIdentifier(identifier: string) {
    let user = null;
    user = await this.prismaService.user.findUnique({
      where: { email: identifier },
    });

    if (user) return user;

    user = await this.prismaService.user.findUnique({
      where: { username: identifier },
    });

    if (!user)
      throw new InternalServerErrorException(ErrorMessage.UserNotFound);

    return user;
  }
}
