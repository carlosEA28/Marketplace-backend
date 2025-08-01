import { prisma } from "../../../../prisma/prisma";
import { FecthProductsData } from "../../../schemas/global/fetchProducts";

export class PostgresGetAllProductsByTypeRepository {
  async execute(getProductsParams: FecthProductsData) {
    const products = await prisma.product.findMany({
      where: {
        sellerId: getProductsParams.sellerId,
        type: getProductsParams.type,
      },
    });

    return products;
  }
}
