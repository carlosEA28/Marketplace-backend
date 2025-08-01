import { UserNotFoundError } from "../../errors/seller";
import { PostgresGetAllProductsByTypeRepository } from "../../repositories/postgres/product/getSellerProductsByType";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";
import { FecthProductsData } from "../../schemas/global/fetchProducts";

export class GetAllSellerProductsByTypeService {
  constructor(
    private getSellerById: PostgresGetSellerById,
    private getAllSellerProductsByType: PostgresGetAllProductsByTypeRepository
  ) {
    this.getSellerById = getSellerById;
    this.getAllSellerProductsByType = getAllSellerProductsByType;
  }

  async execute(fetchProductsParams: FecthProductsData) {
    const sellerExists = await this.getSellerById.execute(
      fetchProductsParams.sellerId
    );

    console.log(sellerExists);

    if (!sellerExists) {
      throw new UserNotFoundError();
    }

    const products = await this.getAllSellerProductsByType.execute(
      fetchProductsParams
    );

    return products;
  }
}
