import { ResumeService } from '@/server/resume/resume.service';
import { Controller } from '@nestjs/common';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}
}
