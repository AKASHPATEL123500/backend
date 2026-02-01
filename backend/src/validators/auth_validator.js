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

  age: z.coerce.number()   // 🔥 MOST IMPORTANT
    .int({ message: "Age must be a number" })
    .min(13, { message: "Age must be at least 13" })
    .max(100, { message: "Age must be below 100" }),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be male, female or other"
  })
  
});
