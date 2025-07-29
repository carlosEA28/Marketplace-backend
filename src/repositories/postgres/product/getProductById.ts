import { prisma } from "../../../../prisma/prisma";

export class PostgresGetProductById {
  async execute(productId: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  }
}
