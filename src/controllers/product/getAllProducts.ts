import { GetAllProductsService } from "../../service/product/getAllProducts";
import { ZodError } from "zod";
import { badRequest, ok, serverError } from "../helpers/httpHelper";
import { ProductNotFoundResponse } from "../helpers/productHelper";
import { ProductNotFoundError } from "../../errors/product";

export class GetAllProductsController {
  constructor(private getAllProductsService: GetAllProductsService) {
    this.getAllProductsService = getAllProductsService;
  }

  async execute() {
    try {
      const products = await this.getAllProductsService.execute();

      return ok(products);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.message,
        });
      }
      if (error instanceof ProductNotFoundError) {
        return badRequest({
          message: error.message,
        });
      }

      console.log(error);

      return serverError("Erro do servidor");
    }
  }
}
