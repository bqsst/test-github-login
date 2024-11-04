import { z } from "zod"

export const formSchema = z.object({
   email: z.string().email('Plaes fill correct email.'),
   password: z
      .string()
      .min(3, 'Password must be more than 3 charactor.')
      .max(20, 'Name must be less than 20 charactor.'),
})