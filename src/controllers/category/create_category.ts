import { Request } from "express";
import { CreateCategoryService } from "../../service/category/create_category";
import { createCategorySchema } from "../../schemas/category";
import { badRequest, created, serverError } from "../helpers/httpHelper";
import { ZodError } from "zod";
import { CategoryAlreadyExistsError } from "../../errors/category";

export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {
    this.createCategoryService = createCategoryService;
  }

  async execute(httpRequest: Request) {
    try {
      const body = httpRequest.body;

      await createCategorySchema.parseAsync(body);

      const createdCategory = this.createCategoryService.execute(body);

      return created(createdCategory);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.message,
        });
      }

      if (error instanceof CategoryAlreadyExistsError) {
        return badRequest({
          message: error.message,
        });
      }

      console.log(error);

      return serverError("Erro interno do servidor");
    }
  }
}
