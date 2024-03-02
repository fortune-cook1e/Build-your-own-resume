import { z } from 'nestjs-zod/z';

export const mailSchema = z.string().email();

export type MailDto = z.infer<typeof mailSchema>;
