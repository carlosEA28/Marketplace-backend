import z from "zod";
import { PasswordComparatorAdapter } from "../../adapters/passwordComparator";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { InvalidPasswordError, UserNotFoundError } from "../../errors/seller";
import { PostgresGetSellerByEmailRepository } from "../../repositories/postgres/seller/getSellerByEmail";
import { loginSchema } from "../../schemas/global/loginSchema";

type LoginSellerData = z.infer<typeof loginSchema>;

export class LoginSellerService {
  constructor(
    private getSellerByEmail: PostgresGetSellerByEmailRepository,
    private passwordComparatorAdapter: PasswordComparatorAdapter,
    private tokenGeneratorAdapter: TokenGeneratorAdapter
  ) {}

  async execute({ email, password }: LoginSellerData) {
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
