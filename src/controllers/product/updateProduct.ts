import { Request } from "express";
import { UpdateProductService } from "../../service/product/updateProduct";
import { UpdateProductSchema } from "../../schemas/product";
import { badRequest, ok, serverError } from "../helpers/httpHelper";
import { ZodError } from "zod";
import { ProductNotFoundError } from "../../errors/product";
import { title } from "process";

export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {
    this.updateProductService = updateProductService;
  }

  async execute(httpRequest: Request) {
    try {
      const { sellerId } = httpRequest.params;

      const updateProductParams = await UpdateProductSchema.parseAsync({
        title: httpRequest.query.title,
        description: httpRequest.query.description,
        price: httpRequest.query.price,
        type: httpRequest.query.type,
        categoryId: httpRequest.query.categoryId,
        productImage: httpRequest.query.productImage,
      });

      const newProduct = await this.updateProductService.execute(
        sellerId,
        updateProductParams
      );

      return ok(newProduct);
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

      return serverError("Erro interno do servidor");
    }
  }
}
