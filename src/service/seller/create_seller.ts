import z from "zod";
import { CreateSellerProps } from "../../schemas/seller";
import { PostgresGetSellerByEmailRepository } from "../../repositories/postgres/seller/getSellerByEmail";
import { PostgresCreateSellerRepository } from "../../repositories/postgres/seller/create_seller";
import { PasswordEncoderAdapter } from "../../adapters/passwordEncoder";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { v4 as uuidV4 } from "uuid";
import { EmailAlreadyInUseError } from "../../errors/seller";
import { S3Service } from "../s3";

type CreateSellerData = z.infer<typeof CreateSellerProps>;

export class CreateSellerService {
  constructor(
    private getSellerByEmailRepository: PostgresGetSellerByEmailRepository,
    private createSellerRepository: PostgresCreateSellerRepository,
    private passwordEncoderAdapter: PasswordEncoderAdapter,
    private tokensGeneratorAdapter: TokenGeneratorAdapter,
    private s3Service: S3Service
  ) {
    this.getSellerByEmailRepository = getSellerByEmailRepository;
    this.createSellerRepository = createSellerRepository;
    this.passwordEncoderAdapter = passwordEncoderAdapter;
    this.tokensGeneratorAdapter = tokensGeneratorAdapter;
    this.s3Service = s3Service;
  }

  async execute(
    createSellerParams: CreateSellerData & {
      imageBuffer: Buffer;
      imageMimeType: string;
    }
  ) {
    const sellerAlreadyExists = await this.getSellerByEmailRepository.execute(
      createSellerParams.email
    );

    if (sellerAlreadyExists) {
      throw new EmailAlreadyInUseError(createSellerParams.email);
    }

    const sellerId = uuidV4();

    const hashedPassoword = await this.passwordEncoderAdapter.execute(
      createSellerParams.password
    );

    const fileName = `seller/${sellerId}.jpg`;

    const imageUrl = await this.s3Service.uploadFile(
      fileName,
      createSellerParams.imageBuffer,
      createSellerParams.imageMimeType
    );

    const newSeller = {
      ...createSellerParams,
      id: sellerId,
      password: hashedPassoword,
      avatarImg: imageUrl,
    };

    const createdSeller = await this.createSellerRepository.execute(newSeller);

    return {
      ...createdSeller,
      tokens: await this.tokensGeneratorAdapter.execute(sellerId),
    };
  }
}
