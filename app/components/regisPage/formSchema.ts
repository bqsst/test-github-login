import { z } from 'zod';

export const formSchema = z
   .object({
      fullname: z
         .string()
         .min(2, 'Name must be more than 2 characters.')
         .max(32, 'Name must be less than 32 characters.'),
      email: z.string().email('Please fill in a correct email.'),
      password: z
         .string()
         .min(3, 'Password must be more than 3 characters.')
         .max(20, 'Password must be less than 20 characters.'),
      confirmPassword: z.string(),
      phone: z.string().min(10, 'Phone number must be at least 10 digits.').max(15, 'Phone number is too long.'),
      attachment: z.any().optional(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Password does not match.',
      path: ['confirmPassword'],
   });
