import { prisma } from "../../../../prisma/prisma";
import { GetProductByCategoryData } from "../../../schemas/product";

export class PostgresGetProductsByCategoryRepository {
  async execute(getProductsByCategoryParams: GetProductByCategoryData) {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: getProductsByCategoryParams.categoryId,
        },
      },
    });

    return products;
  }
}
