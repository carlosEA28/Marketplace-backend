import { prisma } from "../../../../prisma/prisma";
import type { CreateProductData } from "../../../schemas/product";

export class PostegresCreateProductRepository {
  async execute(createProductParams: CreateProductData) {
    const product = await prisma.product.create({
      data: {
        title: createProductParams.title,
        price: createProductParams.price,
        description: createProductParams.description,
        sellerId: createProductParams.sellerId,
        categoryId: createProductParams.categoryId,
        type: createProductParams.type,
        productImage: createProductParams.productImage,
      },
    });

    return product;
  }
}
