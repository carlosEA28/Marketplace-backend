import { CreateSellerProps } from "../../schemas/seller";
import { CreateSellerService } from "../../service/seller/create_seller";
import { Request } from "express";

export class CreateSellerController {
  constructor(private createSellerService: CreateSellerService) {
    this.createSellerService = createSellerService;
  }

  async execute(httpRequest: Request) {
    try {
      const params = httpRequest.body;

      await CreateSellerProps.parseAsync(params);

      const createdSeller = await this.createSellerService.execute(params);

      return createdSeller;
    } catch (error) {
      console.log(error);
    }
  }
}
