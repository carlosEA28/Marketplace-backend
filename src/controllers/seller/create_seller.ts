import { CreateSellerProps } from "../../schemas/seller";
import { CreateSellerService } from "../../service/seller/create_seller";
import { Request } from "express";
import { badRequest, created, serverError } from "../helpers/httpHelper";
// import { ZodError } from "zod";
import { ZodError } from "zod";
import { EmailAlreadyInUseError } from "../../errors/seller";

export class CreateSellerController {
  constructor(private createSellerService: CreateSellerService) {
    this.createSellerService = createSellerService;
  }

  async execute(httpRequest: Request) {
    try {
      const params = httpRequest.body;

      await CreateSellerProps.parseAsync(params);

      const createdSeller = await this.createSellerService.execute(params);

      return created(createdSeller);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.message[0],
        });
      }

      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: error.message,
        });
      }

      console.log(error);
      return serverError("Erro interno do servidor");
    }
  }
}
