import { prisma } from "../../../../prisma/prisma";

export class PostgreGetAllAnoucedProductsQuantityRepository {
  async execute(sellerId: string) {
    const products = await prisma.product.count({
      where: {
        sellerId: sellerId,
        type: "ANUNCIADO",
      },
    });

    return products;
  }
}
