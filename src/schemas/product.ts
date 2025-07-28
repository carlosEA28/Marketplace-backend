import z from "zod";

export const CreateProductSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  price: z
    .number({ error: "O preço deve ser um número" })
    .positive({ message: "O preço deve ser um número positivo" }),
  sellerId: z.uuid({ message: "ID do vendedor inválido" }),
  categoryId: z.uuid({ message: "ID da categoria inválido" }),
  type: z.enum(["ANUNCIADO", "VENDIDO", "DESATIVADO"], {
    message: "Tipo de produto inválido",
  }),
  productImage: z.url({ message: "URL da imagem inválida" }),
});
export type CreateProductData = z.infer<typeof CreateProductSchema>;
