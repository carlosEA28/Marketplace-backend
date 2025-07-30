import { UserNotFoundError } from "../../errors/seller";
import { PostgreGetAllAnoucedProductsQuantityRepository } from "../../repositories/postgres/product/getAllAnoucedProducts";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";
export class GetAllAnoucedProductsQuantityService {
  constructor(
    private getSellerById: PostgresGetSellerById,
    private getAllAnoucedProducts: PostgreGetAllAnoucedProductsQuantityRepository
  ) {
    this.getSellerById = getSellerById;
    this.getAllAnoucedProducts = getAllAnoucedProducts;
  }

  async execute(sellerId: string) {
    const sellerExists = await this.getSellerById.execute(sellerId);

    if (!sellerExists) {
      throw new UserNotFoundError();
    }

    const products = await this.getAllAnoucedProducts.execute(sellerId);

    return products;
  }
}
