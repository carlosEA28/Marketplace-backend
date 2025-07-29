import z from "zod";

export const CreateProductSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  price: z.coerce.number({ message: "O preço é obrigatório" }).positive({
    message: "O preço deve ser positivo",
  }),
  description: z
    .string()
    .trim()
    .min(1, { message: "A descrição é obrigatória" }),
  sellerId: z.string({ message: "ID do vendedor inválido" }),
  categoryId: z.string({ message: "ID da categoria inválido" }),
  type: z
    .enum(["ANUNCIADO", "VENDIDO", "DESATIVADO"], {
      message: "Tipo de produto inválido",
    })
    .default("ANUNCIADO"),
  productImage: z.url({ message: "URL da imagem inválida" }).optional(),
});

export type CreateProductData = z.infer<typeof CreateProductSchema>;
