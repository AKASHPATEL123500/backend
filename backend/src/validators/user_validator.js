import z from "zod"
// Account update ke liye rules
export const updateAccountSchema = z.object({
    name: z.string().min(3, "Naam kam se kam 3 akshar ka chahiye").optional(),
    username: z.string().min(3).toLowerCase().optional(),
    email: z.string().email("Sahi email format daalo").optional(),
});

// Password change ke liye rules
export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Purana password zaroori hai"),
    newPassword: z.string().min(6, "Naya password kam se kam 6 characters ka ho"),
});