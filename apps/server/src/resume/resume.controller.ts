import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ResumeService } from '@/resume/resume.service';
import { UseUser } from '@/user/decorators/user.decorator';
import {
  CreateResumeDto,
  DeleteResumeDto,
  UpdateResumeDto,
  User,
} from '@fe-cookie/resume-generator-shared';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resume: ResumeService) {}

  @Post('/create')
  @UseGuards(JwtGuard)
  async createResume(@UseUser() user: User, data: CreateResumeDto) {
    return await this.resume.create(user.id, data);
  }

  @Post('update')
  @UseGuards(JwtGuard)
  async updateResume(@UseUser() user: User, data: UpdateResumeDto) {
    return await this.resume.update(user.id, data);
  }

  @Get('/list')
  @UseGuards(JwtGuard)
  async getResumeList(@UseUser() user: User) {
    return await this.resume.findAll(user.id);
  }

  @Post('delete')
  @UseGuards(JwtGuard)
  async deleteResume(@UseUser() user: User, data: DeleteResumeDto) {
    return await this.resume.delete(user.id, data.id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getResume(@Param('id') id: string) {
    return await this.resume.findOneById(id);
  }
}
