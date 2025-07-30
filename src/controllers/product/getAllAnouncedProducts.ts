import { Request } from "express";
import { GetAllAnoucedProductsQuantityService } from "../../service/product/getAllAnoucedProducts";
import { badRequest, notFound, ok, serverError } from "../helpers/httpHelper";
import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/seller";

export class GetAllAnoucedProductsQuantityController {
  constructor(
    private getAllAnouncedProductsService: GetAllAnoucedProductsQuantityService
  ) {}

  async execute(httpRequest: Request) {
    try {
      const { sellerId } = httpRequest.params;

      const products = await this.getAllAnouncedProductsService.execute(
        sellerId
      );

      return ok(products);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.message,
        });
      }

      if (error instanceof UserNotFoundError) {
        return notFound({
          message: error.message,
        });
      }

      console.log(error);

      return serverError("Erro do servidor");
    }
  }
}
