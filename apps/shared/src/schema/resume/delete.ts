import { resumeSchema } from '@/schema/resume/resume';
import { createZodDto } from '@/utils';

const deleteResumeSchema = resumeSchema.pick({
  id: true,
});

export class DeleteResumeDto extends createZodDto(deleteResumeSchema) {}
