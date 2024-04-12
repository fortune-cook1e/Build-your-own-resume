import { userSchema } from '@/schema/user/user';
import { createZodDto } from '@/utils';

export const updateUserSchema = userSchema.partial().pick({
  name: true,
  username: true,
  email: true,
  avatar: true,
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
