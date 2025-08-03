import { Request } from "express";
import { GetProductsByPriceRangeService } from "../../service/product/getProductsByPriceRange";
import { badRequest, ok, serverError } from "../helpers/httpHelper";
import {
  GetProductByPriceRangeData,
  GetProductByPriceRangeSchema,
} from "../../schemas/product";
import { ZodError } from "zod";

export class GetProductsByPriceRangeController {
  constructor(
    private getProductsByPriceRangeService: GetProductsByPriceRangeService
  ) {
    this.getProductsByPriceRangeService = getProductsByPriceRangeService;
  }

  async execute(httpRequest: Request) {
    try {
      const getProductsByPriceRangeParams =
        await GetProductByPriceRangeSchema.parseAsync({
          from: httpRequest.query.from,
          to: httpRequest.query.to,
        });

      const products = await this.getProductsByPriceRangeService.execute(
        getProductsByPriceRangeParams
      );

      return ok(products);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.message,
        });
      }

      console.log(error);

      return serverError("Erro do servidor");
    }
  }
}
