import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1, "Field Username is required"),
    password: z.string().min(1, "Field Password is required"),
    rememberMe: z.boolean().optional()
})

export type LoginFormData = z.infer<typeof loginSchema>