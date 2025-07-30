import { prisma } from "../../../../prisma/prisma";
import { FecthProductsData } from "../../../schemas/global/fetchProducts";

export class PostgresGetAllSoldProductsQuantityRepository {
  async execute(fetchProductsParams: FecthProductsData) {
    const soldProducts = await prisma.product.count({
      where: {
        sellerId: fetchProductsParams.sellerId,
        type: fetchProductsParams.type,
      },
    });

    return soldProducts;
  }
}
