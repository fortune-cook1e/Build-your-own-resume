import { resumeSchema } from '@/schema/resume';
import { createZodDto } from '@/utils';

export const updateResumeSchema = resumeSchema.partial();

export class UpdateResumeDto extends createZodDto(updateResumeSchema) {}
