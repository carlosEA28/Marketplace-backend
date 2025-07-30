import z from "zod";

export const fetchPoductProps = z.object({
  sellerId: z.string().uuid({ message: "ID do vendedor inválido" }),
  type: z.enum(["ANUNCIADO", "VENDIDO", "DESATIVADO"]),
});

export type FecthProductsData = z.infer<typeof fetchPoductProps>;
