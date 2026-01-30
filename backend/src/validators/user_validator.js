import { z } from "zod";

export const signupSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" }),
        
    username: z.string()
        .trim()
        .min(3, { message: "Username too short" })
        .toLowerCase(),

    email: z.string()
        .trim()
        .email({ message: "Invalid email address" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

