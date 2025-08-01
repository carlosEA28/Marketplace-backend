import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/seller";
import { badRequest, notFound, ok, serverError } from "../helpers/httpHelper";
import { fetchPoductProps } from "../../schemas/global/fetchProducts";
import { Request } from "express";
import { GetAllSellerProductsByTypeService } from "../../service/product/getAllSellerProductsByType";

export class GetAllSellerProductsByTypeController {
  constructor(
    private getAAllSellerProductsByType: GetAllSellerProductsByTypeService
  ) {
    this.getAAllSellerProductsByType = getAAllSellerProductsByType;
  }

  async execute(httpRequest: Request) {
    try {
      const fetchProductsParams = await fetchPoductProps.parseAsync({
        sellerId: httpRequest.query.sellerId,
        type: httpRequest.query.type,
      });

      const soldProducts = await this.getAAllSellerProductsByType.execute(
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
