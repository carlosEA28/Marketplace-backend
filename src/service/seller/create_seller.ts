import z from "zod";
import { CreateSellerProps } from "../../schemas/seller";
import { PostgresGetSellerByEmailRepository } from "../../repositories/postgres/seller/getSellerByEmail";
import { PostgresCreateSellerRepository } from "../../repositories/postgres/seller/create_seller";
import { PasswordEncoderAdapter } from "../../adapters/passwordEncoder";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { v4 as uuidV4 } from "uuid";
import { generateEmailAlreadyInUse } from "../../controllers/helpers/sellerHelper";
import { EmailAlreadyInUseError } from "../../errors/seller";

type CreateSellerData = z.infer<typeof CreateSellerProps>;

export class CreateSellerService {
  constructor(
    private getSellerByEmailRepository: PostgresGetSellerByEmailRepository,
    private createSellerRepository: PostgresCreateSellerRepository,
    private passwordEncoderAdapter: PasswordEncoderAdapter,
    private tokensGeneratorAdapter: TokenGeneratorAdapter
  ) {
    this.getSellerByEmailRepository = getSellerByEmailRepository;
    this.createSellerRepository = createSellerRepository;
    this.passwordEncoderAdapter = passwordEncoderAdapter;
    this.tokensGeneratorAdapter = tokensGeneratorAdapter;
  }

  async execute(createSellerParams: CreateSellerData) {
    const sellerAlreadyExists = await this.getSellerByEmailRepository.execute(
      createSellerParams.email
    );

    if (sellerAlreadyExists) {
      //criar erro customizado
      throw new EmailAlreadyInUseError(createSellerParams.email);
    }

    const sellerId = uuidV4();

    const hashedPassoword = await this.passwordEncoderAdapter.execute(
      createSellerParams.password
    );

    const newSeller = {
      ...createSellerParams,
      id: sellerId,
      password: hashedPassoword,
    };

    const createdSeller = await this.createSellerRepository.execute(newSeller);

    return {
      ...createdSeller,
      tokens: await this.tokensGeneratorAdapter.execute(sellerId),
    };
  }
}
