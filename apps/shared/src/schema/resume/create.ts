import { resumeSchema } from '@/schema/resume';
import { createZodDto } from '@/utils';

export const createResumeSchema = resumeSchema.pick({
  title: true,
  description: true,
  visibility: true,
});
export class CreateResumeDto extends createZodDto(createResumeSchema) {}
