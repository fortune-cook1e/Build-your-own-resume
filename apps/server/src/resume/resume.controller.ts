import { ResumeService } from '@/resume/resume.service';
import { Controller } from '@nestjs/common';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}
}
