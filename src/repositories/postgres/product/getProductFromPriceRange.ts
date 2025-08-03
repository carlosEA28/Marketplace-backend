import { prisma } from "../../../../prisma/prisma";
import { GetProductByPriceRangeData } from "../../../schemas/product";

export class PostgresGetProductsByPriceRangeRepository {
  async execute(getProductsByPriceRangeParams: GetProductByPriceRangeData) {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: getProductsByPriceRangeParams.from,
          lte: getProductsByPriceRangeParams.to,
        },
      },
    });

    return products;
  }
}
