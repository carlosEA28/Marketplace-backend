import { Request } from "express";
import { GetAllAnoucedProductsQuantityService } from "../../service/product/getAllAnoucedProducts";
import { badRequest, notFound, ok, serverError } from "../helpers/httpHelper";
import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/seller";
import { GetAllSoldProductsQuantityService } from "../../service/product/getAllSoldProductsQuantity";
import { fetchPoductProps } from "../../schemas/global/fetchProducts";

export class GetAllSoldProductsQuantityController {
  constructor(
    private getAllSoldProductsQuantity: GetAllSoldProductsQuantityService
  ) {
    this.getAllSoldProductsQuantity = getAllSoldProductsQuantity;
  }

  async execute(httpRequest: Request) {
    try {
      const fetchProductsParams = await fetchPoductProps.parseAsync({
        sellerId: httpRequest.query.sellerId,
        type: httpRequest.query.type,
      });

      const soldProducts = await this.getAllSoldProductsQuantity.execute(
        fetchProductsParams
      );

      return ok(soldProducts);
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
