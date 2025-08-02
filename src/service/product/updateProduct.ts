import { Decimal } from "../../../generated/prisma/runtime/library";
import { ProductNotFoundError } from "../../errors/product";
import { PostgresGetProductById } from "../../repositories/postgres/product/getProductById";
import { PostgresUpdateProductRepository } from "../../repositories/postgres/product/updateProduct";
import { UpdateProductData } from "../../schemas/product";

export class UpdateProductService {
  constructor(
    private getProductById: PostgresGetProductById,
    private updateProductRepository: PostgresUpdateProductRepository
  ) {
    this.getProductById = getProductById;
    this.updateProductRepository = updateProductRepository;
  }

  async execute(productId: string, updateProductParams: UpdateProductData) {
    const product = await this.getProductById.execute(productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return await this.updateProductRepository.execute(
      productId,
      updateProductParams
    );
  }
}
