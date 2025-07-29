import z from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome da categoria é obrigatório" }),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
