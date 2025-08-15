import { PasswordComparatorAdapter } from "../../adapters/passwordComparator";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { InvalidPasswordError, UserNotFoundError } from "../../errors/seller";
import { PostgresGetSellerByEmailRepository } from "../../repositories/postgres/seller/getSellerByEmail";
import type { LoginSchemaData } from "../../schemas/global/loginSchema";
import { ILoginSellerService } from "../../schemas/implementation/seller/ILoginSellerService";

export class LoginSellerService implements ILoginSellerService {
  constructor(
    private getSellerByEmail: PostgresGetSellerByEmailRepository,
    private passwordComparatorAdapter: PasswordComparatorAdapter,
    private tokenGeneratorAdapter: TokenGeneratorAdapter
  ) {}

  async execute({ email, password }: LoginSchemaData) {
    const seller = await this.getSellerByEmail.execute(email);

    if (!seller) {
      throw new UserNotFoundError();
    }

    const isPasswordValid = await this.passwordComparatorAdapter.execute(
      password,
      seller.password
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    return {
      ...seller,
      tokens: await this.tokenGeneratorAdapter.execute(seller.id),
    };
  }
}
