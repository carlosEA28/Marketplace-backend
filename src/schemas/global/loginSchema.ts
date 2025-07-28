import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),

  password: z.string({
    error: "Password is required",
  }),
});

export type LoginSchemaData = z.infer<typeof loginSchema>;
