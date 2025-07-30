import { UserNotFoundError } from "../../errors/seller";
import { PostgresGetAllSoldProductsQuantityRepository } from "../../repositories/postgres/product/getAllSoldProductsQuantity";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";
import { FecthProductsData } from "../../schemas/global/fetchProducts";

export class GetAllSoldProductsQuantityService {
  constructor(
    private getSellerById: PostgresGetSellerById,
    private getAllSoldProducts: PostgresGetAllSoldProductsQuantityRepository
  ) {
    this.getSellerById = getSellerById;
    this.getAllSoldProducts = getAllSoldProducts;
  }

  async execute(fetchProductsParams: FecthProductsData) {
    const sellerExists = await this.getSellerById.execute(
      fetchProductsParams.sellerId
    );

    if (!sellerExists) {
      throw new UserNotFoundError();
    }

    const products = await this.getAllSoldProducts.execute(fetchProductsParams);

    return products;
  }
}
