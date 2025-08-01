import { UserNotFoundError } from "../../errors/seller";
import { PostgresGetAllSellerProductsRepository } from "../../repositories/postgres/product/getAllSellerProducts";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";

export class GetAllSellerProductsService {
  constructor(
    private getSellerById: PostgresGetSellerById,
    private getAllSellerProductsRepository: PostgresGetAllSellerProductsRepository
  ) {
    this.getSellerById = getSellerById;
    this.getAllSellerProductsRepository = getAllSellerProductsRepository;
  }

  async execute(sellerId: string) {
    const sellerExists = await this.getSellerById.execute(sellerId);

    if (!sellerExists) {
      throw new UserNotFoundError();
    }

    const products = await this.getAllSellerProductsRepository.execute(
      sellerId
    );

    if (!products) {
      return {
        message: "Você não possui produtos cadastrados",
      };
    }

    return products;
  }
}
