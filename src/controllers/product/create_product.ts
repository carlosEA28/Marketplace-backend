import { Request } from "express";
import { CreateProductService } from "../../service/product/create_product";
import { CreateProductSchema } from "../../schemas/product";
import {
  badRequest,
  created,
  notFound,
  serverError,
} from "../helpers/httpHelper";
import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/seller";

export class CreateProductController {
  constructor(private createProductRepository: CreateProductService) {
    this.createProductRepository = createProductRepository;
  }

  async execute(httpRequest: Request) {
    try {
      const { body, file } = httpRequest;

      await CreateProductSchema.parseAsync(body);

      const createdProduct = await this.createProductRepository.execute({
        ...body,
        imageBuffer: file?.buffer,
        imageMimeType: file?.mimetype,
      });

      return created(createdProduct);
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
