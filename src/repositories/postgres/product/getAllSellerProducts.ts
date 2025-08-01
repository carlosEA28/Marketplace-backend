import { prisma } from "../../../../prisma/prisma";
export class PostgresGetAllSellerProductsRepository {
  async execute(sellerId: string) {
    const products = await prisma.product.findMany({
      where: {
        sellerId,
      },
    });

    return products;
  }
}
