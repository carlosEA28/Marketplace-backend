import { ProductNotFoundResponse } from "../../controllers/helpers/productHelper";
import { PostgresGetProductsByPriceRangeRepository } from "../../repositories/postgres/product/getProductFromPriceRange";
import { GetProductByPriceRangeData } from "../../schemas/product";

export class GetProductsByPriceRangeService {
  constructor(
    private getProductsByPriceRangeRepository: PostgresGetProductsByPriceRangeRepository
  ) {}

  async execute(getProductsByPriceRangeParams: GetProductByPriceRangeData) {
    const products = await this.getProductsByPriceRangeRepository.execute(
      getProductsByPriceRangeParams
    );

    if (!products) {
      return ProductNotFoundResponse();
    }

    return products;
  }
}
