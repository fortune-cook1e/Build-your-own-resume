import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { PrintModule } from '@/print/print.module';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService],
  imports: [PrintModule],
})
export class ResumeModule {}
