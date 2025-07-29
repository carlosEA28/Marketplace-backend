import { UserNotFoundError } from "../../errors/seller";
import { PostegresCreateProductRepository } from "../../repositories/postgres/product/create_product";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";
import { CreateProductData } from "../../schemas/product";
import { v4 as uuidv4 } from "uuid";
import { S3Service } from "../s3";

export class CreateProductService {
  constructor(
    private getSellerByIdRepository: PostgresGetSellerById,
    private createProductRepository: PostegresCreateProductRepository,
    private s3Service: S3Service
  ) {
    this.getSellerByIdRepository = getSellerByIdRepository;
    this.createProductRepository = createProductRepository;
    this.s3Service = s3Service;
  }

  async execute(
    createProductParams: CreateProductData & {
      imageBuffer: Buffer;
      imageMimeType: string;
    }
  ) {
    const sellerId = createProductParams.sellerId;

    const sellerExists = await this.getSellerByIdRepository.execute(sellerId);

    if (!sellerExists) {
      throw new UserNotFoundError();
    }

    const productId = uuidv4();

    const fileName = `product/${productId}.jpg`;

    const imageUrl = await this.s3Service.uploadFile(
      fileName,
      createProductParams.imageBuffer,
      createProductParams.imageMimeType
    );

    const newProduct = {
      ...createProductParams,
      id: productId,
      productImage: imageUrl,
    };

    const product = await this.createProductRepository.execute(newProduct);

    return product;
  }
}
