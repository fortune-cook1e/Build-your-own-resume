import { resumeSchema } from '@/schema/resume/resume';
import { createZodDto } from '@/utils';

export const importResumeSchema = resumeSchema.pick({
  title: true,
  description: true,
  visibility: true,
  data: true,
});

export class ImportResumeDto extends createZodDto(importResumeSchema) {}
