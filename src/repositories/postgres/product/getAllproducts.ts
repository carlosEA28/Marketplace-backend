import { prisma } from "../../../../prisma/prisma";

export class PostgresGetAllProductsRepository {
  async execute() {
    const products = await prisma.product.findMany();

    return products;
  }
}
