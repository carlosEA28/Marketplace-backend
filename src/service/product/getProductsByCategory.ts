import { get } from "http";
import { ProductNotFoundResponse } from "../../controllers/helpers/productHelper";
import { CategoryNotFoundError } from "../../errors/category";
import { PostgresGetCategoryById } from "../../repositories/postgres/category/getCategoryById";
import { PostgresGetProductsByCategoryRepository } from "../../repositories/postgres/product/getProductsByCategory";
import { GetProductByCategoryData } from "../../schemas/product";

export class GetProductsByCategoryService {
  constructor(
    private getCategoryById: PostgresGetCategoryById,
    private getProductsByCategory: PostgresGetProductsByCategoryRepository
  ) {}

  async execute(getProductByCategoryParams: GetProductByCategoryData) {
    for (const categoryId of getProductByCategoryParams.categoryId) {
      const categoryExists = await this.getCategoryById.execute(categoryId);
      if (!categoryExists) {
        throw new CategoryNotFoundError();
      }
    }

    const products = await this.getProductsByCategory.execute(
      getProductByCategoryParams
    );

    if (!products) {
      return ProductNotFoundResponse();
    }

    return products;
  }
}
