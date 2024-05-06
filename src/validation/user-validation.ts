import { z, ZodType } from 'zod'

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(180),
    password: z.string().min(1).max(180),
    name: z.string().min(1).max(180),
  })
}