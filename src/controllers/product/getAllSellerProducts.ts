import { Request } from "express";
import { GetAllSellerProductsService } from "../../service/product/getAllSellerProducts";
import { ZodError } from "zod";
import { badRequest, notFound, ok, serverError } from "../helpers/httpHelper";
import { UserNotFoundError } from "../../errors/seller";

export class GetAllSellerProductsController {
  constructor(private getAllSellerProducts: GetAllSellerProductsService) {
    this.getAllSellerProducts = getAllSellerProducts;
  }

  async execute(httpRequest: Request) {
    try {
      const { sellerId } = httpRequest.params;

      const products = await this.getAllSellerProducts.execute(sellerId);

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
