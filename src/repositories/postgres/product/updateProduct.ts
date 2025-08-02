import { prisma } from "../../../../prisma/prisma";
import { UpdateProductData } from "../../../schemas/product";

export class PostgresUpdateProductRepository {
  async execute(productId: string, updateProductParams: UpdateProductData) {
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...updateProductParams,
      },
    });
  }
}
