import { RedisService } from "../../../config/redis/redis";
import { PostgresGetAllSellerProductsRepository } from "../../postgres/product/getAllSellerProducts";

export class RedisGetAllSellerProductsRepository {
  constructor(
    private getAllSellerProductsRepository: PostgresGetAllSellerProductsRepository,
    private redis: RedisService
  ) {
    this.getAllSellerProductsRepository = getAllSellerProductsRepository;
    this.redis = redis;
  }

  async execute(sellerId: string) {
    const cachedProducts = await this.redis.get("products");

    if (!cachedProducts) {
      const products = await this.getAllSellerProductsRepository.execute(
        sellerId
      );

      //mudar para um dia a ex
      await this.redis.set(
        `products:seller:${sellerId}`,
        JSON.stringify(products),
        "EX",
        86400
      );

      return products;
    }

    return JSON.parse(cachedProducts);
  }
}
