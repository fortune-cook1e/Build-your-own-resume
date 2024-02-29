import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ResumeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string) {
    const resume = await this.prismaService.resume.findUnique({
      where: { id },
    });
    if (!resume) {
      throw new InternalServerErrorException('resume not found');
    }

    return resume;
  }
}
