import { z } from "zod";

export const registerSchema = z.object({
    username : z.string().min(4, "Full name is required!"),
    email : z.string().email("Please write your email correctly!"),
    password : z.string().min(4, "Password must be at least 4 characters!"),
});

export type RegisterFormInputType = z.infer<typeof registerSchema>;