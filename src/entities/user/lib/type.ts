import { z } from 'zod';

export interface IUserCardProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  website: z.string()
    .optional()
    .transform(val => 
      val && !val.startsWith('http://') && !val.startsWith('https://')
        ? `https://${val}`
        : val
    )
    .pipe(z.string().url().optional()),
});

export const UsersArraySchema = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;