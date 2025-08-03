import { Request } from "express";
import { GetProductsByCategoryService } from "../../service/product/getProductsByCategory";
import { badRequest, notFound, ok, serverError } from "../helpers/httpHelper";
import { ZodError } from "zod";
import { CategoryNotFoundError } from "../../errors/category";
import { GetProductByCategorySchema } from "../../schemas/product";

export class GetProductsByCategoryController {
  constructor(
    private getProductsByCategoryService: GetProductsByCategoryService
  ) {
    this.getProductsByCategoryService = getProductsByCategoryService;
  }

  async execute(httpRequest: Request) {
    try {
      const categoryIds = Array.isArray(httpRequest.query.categoryId)
        ? httpRequest.query.categoryId
        : [httpRequest.query.categoryId].filter(Boolean);
      const fetchProductsByCategoryParams =
        await GetProductByCategorySchema.parseAsync({
          categoryId: categoryIds,
        });

      const products = await this.getProductsByCategoryService.execute(
        fetchProductsByCategoryParams
      );

      return ok(products);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.message,
        });
      }

      if (error instanceof CategoryNotFoundError) {
        return notFound({
          message: error.message,
        });
      }

      console.log(error);

      return serverError("Erro do servidor");
    }
  }
}
