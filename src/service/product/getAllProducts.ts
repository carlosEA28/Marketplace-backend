import { ProductNotFoundResponse } from "../../controllers/helpers/productHelper";
import { PostgresGetAllProductsRepository } from "../../repositories/postgres/product/getAllproducts";
import { ProductNotFoundError } from "../../errors/product";

export class GetAllProductsService {
  constructor(private getAllProducts: PostgresGetAllProductsRepository) {
    this.getAllProducts = getAllProducts;
  }
  async execute() {
    const products = await this.getAllProducts.execute();

    if (!products) {
      return ProductNotFoundResponse();
    }

    return products;
  }
}
