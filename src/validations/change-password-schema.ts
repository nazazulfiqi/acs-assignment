import { z } from 'zod';

export const changePasswordSchema = z.object({
  password: z.string().nonempty('Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
});
