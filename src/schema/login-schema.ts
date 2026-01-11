
import { z } from "zod";

export const loginSchema = z.object({
    username: z.string(),
    password : z.string().min(4, "Password must be at least 4 characters!"),
});

export type LoginFormInputType = z.infer<typeof loginSchema>