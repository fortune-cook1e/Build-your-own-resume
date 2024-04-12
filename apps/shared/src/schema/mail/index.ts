import { z } from 'zod';

export const mailSchema = z.string().email();

export type MailDto = z.infer<typeof mailSchema>;
